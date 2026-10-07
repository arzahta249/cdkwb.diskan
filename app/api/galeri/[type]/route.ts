import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';
import { deleteImageKitFile, uploadImageKitFile } from '@/lib/imagekit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES = ['foto', 'video', 'infografis'] as const;
type GalleryType = (typeof TYPES)[number];
type GalleryData = Record<string, unknown>;
type ImageKitFileIds = Record<string, string | string[]>;

class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

function isGalleryType(type: string): type is GalleryType {
  return TYPES.includes(type as GalleryType);
}

function collectionName(type: GalleryType) {
  return `galeri_${type}`;
}

function idField(type: GalleryType) {
  return type === 'foto' ? 'ID_foto' : type === 'video' ? 'ID_video' : 'ID_infografis';
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function getFile(formData: FormData, field: string) {
  const value = formData.get(field);
  return value instanceof File && value.size > 0 ? value : null;
}

function ensureSignedIn(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  if (!cookieStore.get('auth_token')?.value) {
    throw new ApiError('Unauthorized', 401);
  }
}

function errorResponse(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(fallback, error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}

async function uploadFile(file: File, type: GalleryType) {
  const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new ApiError(`Ukuran file maksimal ${maxSize / 1024 / 1024}MB`, 400);
  }

  return uploadImageKitFile(file, `galeri-${type}`);
}

function getImageKitFileIds(data: GalleryData): ImageKitFileIds {
  const value = data.imagekit_file_ids;
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as ImageKitFileIds
    : {};
}

function flattenFileIds(fileIds: ImageKitFileIds) {
  return Object.values(fileIds).flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value): value is string => typeof value === 'string' && value.length > 0);
}

export async function GET(_request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  if (!isGalleryType(type)) return NextResponse.json({ error: 'Tipe galeri tidak valid' }, { status: 400 });

  try {
    const snapshot = await adminDb.collection(collectionName(type)).orderBy('tanggal', 'desc').get();
    const rows = snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
      [idField(type)]: doc.id,
      ...(convertTimestamps(doc.data()) as GalleryData),
    }));
    return NextResponse.json({ data: rows });
  } catch (error: unknown) {
    return errorResponse(error, `Gagal mengambil galeri ${type}`);
  }
}

export async function POST(request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  if (!isGalleryType(type)) return NextResponse.json({ error: 'Tipe galeri tidak valid' }, { status: 400 });

  try {
    ensureSignedIn(await cookies());
    const formData = await request.formData();
    const judul = getString(formData, 'judul');
    const kategori = getString(formData, 'kategori');
    const tanggal = getString(formData, 'tanggal');
    const deskripsi = getString(formData, 'deskripsi');

    if (!judul || !kategori || !tanggal || !deskripsi) {
      throw new ApiError('Judul, kategori, tanggal, dan deskripsi wajib diisi', 400);
    }

    const slug = `${judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now()}`;
    const data: GalleryData = {
      Judul: judul,
      Slug: slug,
      kategori_nama: kategori,
      kategori,
      status: 'Aktif',
      tanggal,
      value: JSON.stringify({ deskripsi }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (type === 'foto') {
      const image = getFile(formData, 'image');
      if (!image) throw new ApiError('Gambar utama wajib diunggah', 400);
      const imageUpload = await uploadFile(image, type);
      data.URL_image = imageUpload.url;
      const subPhotos = formData.getAll('sub_photos').filter((value): value is File => value instanceof File && value.size > 0);
      if (subPhotos.length > 5) throw new ApiError('Maksimal 5 sub-foto', 400);
      const subPhotoUploads = await Promise.all(subPhotos.map((file) => uploadFile(file, type)));
      data.value = JSON.stringify({ deskripsi, sub_photos: subPhotoUploads.map((upload) => upload.url) });
      data.imagekit_file_ids = { image: imageUpload.fileId, sub_photos: subPhotoUploads.map((upload) => upload.fileId) };
    } else if (type === 'video') {
      const thumbnail = getFile(formData, 'thumbnail');
      const durasi = getString(formData, 'durasi');
      const sourceType = getString(formData, 'videoSourceType');
      let videoUrl = getString(formData, 'videoUrl');
      if (!thumbnail || !durasi) throw new ApiError('Thumbnail dan durasi video wajib diisi', 400);
      if (sourceType === 'upload') {
        const video = getFile(formData, 'videoFile');
        if (!video) throw new ApiError('File video wajib diunggah', 400);
        const videoUpload = await uploadFile(video, type);
        videoUrl = videoUpload.url;
        data.imagekit_file_ids = { video: videoUpload.fileId };
      }
      if (!videoUrl) throw new ApiError('URL video wajib diisi', 400);
      const thumbnailUpload = await uploadFile(thumbnail, type);
      data.URL_thumbnail = thumbnailUpload.url;
      data.URL_video = videoUrl;
      data.durasi_video = durasi;
      data.imagekit_file_ids = { ...(getImageKitFileIds(data)), thumbnail: thumbnailUpload.fileId };
    } else {
      const thumbnail = getFile(formData, 'thumbnail');
      const pdf = getFile(formData, 'pdf');
      if (!thumbnail || !pdf) throw new ApiError('Thumbnail dan dokumen PDF wajib diunggah', 400);
      const thumbnailUpload = await uploadFile(thumbnail, type);
      const documentUpload = await uploadFile(pdf, type);
      data.URL_thumbnail = thumbnailUpload.url;
      data.URL_dokumen = documentUpload.url;
      data.imagekit_file_ids = { thumbnail: thumbnailUpload.fileId, document: documentUpload.fileId };
    }

    const document = await adminDb.collection(collectionName(type)).add(data);
    return NextResponse.json({ success: true, id: document.id }, { status: 201 });
  } catch (error: unknown) {
    return errorResponse(error, `Gagal menyimpan galeri ${type}`);
  }
}

export async function PUT(request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  const id = new URL(request.url).searchParams.get('id');
  if (!isGalleryType(type) || !id) return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 400 });

  try {
    ensureSignedIn(await cookies());
    const formData = await request.formData();
    const judul = getString(formData, 'judul');
    const kategori = getString(formData, 'kategori');
    const tanggal = getString(formData, 'tanggal');
    const deskripsi = getString(formData, 'deskripsi');
    if (!judul || !kategori || !tanggal || !deskripsi) throw new ApiError('Judul, kategori, tanggal, dan deskripsi wajib diisi', 400);

    const docRef = adminDb.collection(collectionName(type)).doc(id);
    const current = await docRef.get();
    if (!current.exists) throw new ApiError('Data galeri tidak ditemukan', 404);

    const currentData = current.data() as GalleryData;
    const update: GalleryData = {
      Judul: judul,
      Slug: `${judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now()}`,
      kategori_nama: kategori,
      kategori,
      tanggal,
      value: JSON.stringify({ deskripsi, sub_photos: type === 'foto' ? (() => {
        try { return JSON.parse(String(currentData.value)).sub_photos || []; } catch { return []; }
      })() : undefined }),
      updated_at: new Date().toISOString(),
    };

    const image = getFile(formData, type === 'foto' ? 'image' : 'thumbnail');
    let replacedFileId = '';
    if (image) {
      const field = type === 'foto' ? 'URL_image' : 'URL_thumbnail';
      const fileIdKey = type === 'foto' ? 'image' : 'thumbnail';
      const upload = await uploadFile(image, type);
      const currentFileIds = getImageKitFileIds(currentData);
      const currentFileId = currentFileIds[fileIdKey];
      replacedFileId = typeof currentFileId === 'string' ? currentFileId : '';
      update[field] = upload.url;
      update.imagekit_file_ids = { ...currentFileIds, [fileIdKey]: upload.fileId };
    }
    await docRef.update(update);
    if (replacedFileId) {
      try {
        await deleteImageKitFile(replacedFileId);
      } catch (error) {
        console.error('Delete replaced ImageKit gallery file error:', error);
      }
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error, `Gagal memperbarui galeri ${type}`);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  const id = new URL(request.url).searchParams.get('id');
  if (!isGalleryType(type) || !id) return NextResponse.json({ error: 'Permintaan tidak valid' }, { status: 400 });

  try {
    ensureSignedIn(await cookies());
    const docRef = adminDb.collection(collectionName(type)).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) throw new ApiError('Data galeri tidak ditemukan', 404);
    const fileIds = getImageKitFileIds(doc.data() as GalleryData);
    await docRef.delete();
    await Promise.all(flattenFileIds(fileIds).map(async (fileId) => {
      try {
        await deleteImageKitFile(fileId);
      } catch (error) {
        console.error('Delete ImageKit gallery file error:', error);
      }
    }));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error, `Gagal menghapus galeri ${type}`);
  }
}
