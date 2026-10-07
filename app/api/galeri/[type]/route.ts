import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES = ['foto', 'video', 'infografis'] as const;
type GalleryType = (typeof TYPES)[number];
type GalleryData = Record<string, unknown>;

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

  const extension = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : '';
  const filename = `galeri/${type}/${Date.now()}-${randomUUID()}${extension}`;
  const token = randomUUID();
  const bucket = adminStorage.bucket();

  await bucket.file(filename).save(Buffer.from(await file.arrayBuffer()), {
    contentType: file.type || 'application/octet-stream',
    metadata: { metadata: { firebaseStorageDownloadTokens: token } },
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${token}`;
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
      data.URL_image = await uploadFile(image, type);
      const subPhotos = formData.getAll('sub_photos').filter((value): value is File => value instanceof File && value.size > 0);
      if (subPhotos.length > 5) throw new ApiError('Maksimal 5 sub-foto', 400);
      data.value = JSON.stringify({ deskripsi, sub_photos: await Promise.all(subPhotos.map((file) => uploadFile(file, type))) });
    } else if (type === 'video') {
      const thumbnail = getFile(formData, 'thumbnail');
      const durasi = getString(formData, 'durasi');
      const sourceType = getString(formData, 'videoSourceType');
      let videoUrl = getString(formData, 'videoUrl');
      if (!thumbnail || !durasi) throw new ApiError('Thumbnail dan durasi video wajib diisi', 400);
      if (sourceType === 'upload') {
        const video = getFile(formData, 'videoFile');
        if (!video) throw new ApiError('File video wajib diunggah', 400);
        videoUrl = await uploadFile(video, type);
      }
      if (!videoUrl) throw new ApiError('URL video wajib diisi', 400);
      data.URL_thumbnail = await uploadFile(thumbnail, type);
      data.URL_video = videoUrl;
      data.durasi_video = durasi;
    } else {
      const thumbnail = getFile(formData, 'thumbnail');
      const pdf = getFile(formData, 'pdf');
      if (!thumbnail || !pdf) throw new ApiError('Thumbnail dan dokumen PDF wajib diunggah', 400);
      data.URL_thumbnail = await uploadFile(thumbnail, type);
      data.URL_dokumen = await uploadFile(pdf, type);
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
    if (image) update[type === 'foto' ? 'URL_image' : 'URL_thumbnail'] = await uploadFile(image, type);
    await docRef.update(update);
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
    await adminDb.collection(collectionName(type)).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error, `Gagal menghapus galeri ${type}`);
  }
}
