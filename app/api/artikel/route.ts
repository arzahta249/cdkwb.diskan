import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';
import { convertTimestamps } from '@/lib/firebase-utils';
import { deleteImageKitFile, uploadImageKitFile } from '@/lib/imagekit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
type ArticleData = Record<string, unknown>;

class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

function getErrorResponse(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ error: fallbackMessage }, { status: 500 });
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function getImageFile(formData: FormData) {
  const value = formData.get('image');
  return value instanceof File && value.size > 0 ? value : null;
}

async function uploadArtikelImage(imageFile: File, slug: string) {
  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    throw new ApiError('Format gambar harus JPG, PNG, atau WEBP', 400);
  }

  if (imageFile.size > MAX_IMAGE_SIZE) {
    throw new ApiError('Ukuran gambar maksimal 2MB', 400);
  }

  return uploadImageKitFile(imageFile, slug);
}

export async function GET() {
  try {
    const snapshot = await adminDb.collection('artikel').orderBy('tanggal', 'desc').get();
    const rows = snapshot.docs.map((doc: { id: string; data: () => unknown }) => {
      const data = convertTimestamps(doc.data()) as ArticleData;
      return {
        ID_artikel: doc.id,
        ...data,
        nama_penulis: typeof data.penulis === 'string' ? data.penulis : 'Admin',
      };
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    console.error('Fetch artikel error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data artikel' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const judul = getString(formData, 'judul');
    const isi_artikel = getString(formData, 'isi_artikel');
    const status = getString(formData, 'status');
    const kategori = getString(formData, 'kategori');
    const instagramUrl = getString(formData, 'instagramUrl');
    const imageFile = getImageFile(formData);

    if (!judul || !isi_artikel || !kategori) {
      return NextResponse.json(
        { error: 'Judul, Kategori, dan Isi Artikel wajib diisi' },
        { status: 400 }
      );
    }

    const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let imageUrl = '';
    let imagekitFileId = '';

    if (imageFile && imageFile.name) {
      const upload = await uploadArtikelImage(imageFile, slug);
      imageUrl = upload.url;
      imagekitFileId = upload.fileId;
    }

    const valueJson = imageUrl ? JSON.stringify({ image: imageUrl }) : null;
    const tanggal = new Date().toISOString();

    const docRef = await adminDb.collection('artikel').add({
      Judul: judul,
      Slug: slug,
      isi_artikel: isi_artikel,
      status: status || 'draft',
      tanggal: tanggal,
      id_penulis: token,
      penulis: 'Admin', // In real app, fetch from users collection
      kategori: kategori,
      value: valueJson,
      imagekit_file_id: imagekitFileId || null,
      instagram_url: instagramUrl || null,
      created_at: tanggal,
      updated_at: tanggal
    });

    return NextResponse.json(
      { success: true, message: 'Artikel berhasil dibuat', id: docRef.id },
      { status: 201 }
    );
  } catch (error: unknown) {
    return getErrorResponse(error, 'Terjadi kesalahan pada server saat membuat artikel');
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('auth_token')?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('artikel').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });

    const imagekitFileId = (doc.data() as ArticleData | undefined)?.imagekit_file_id;
    await docRef.delete();
    if (typeof imagekitFileId === 'string' && imagekitFileId) {
      try {
        await deleteImageKitFile(imagekitFileId);
      } catch (error) {
        console.error('Delete ImageKit article image error:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: unknown) {
    return getErrorResponse(error, 'Terjadi kesalahan pada server saat menghapus artikel');
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('auth_token')?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const id = getString(formData, 'id');
    const judul = getString(formData, 'judul');
    const isi_artikel = getString(formData, 'isi_artikel');
    const status = getString(formData, 'status');
    const kategori = getString(formData, 'kategori');
    const instagramUrl = getString(formData, 'instagramUrl');
    const imageFile = getImageFile(formData);

    if (!id || !judul || !isi_artikel || !kategori) {
      return NextResponse.json(
        { error: 'ID, Judul, isi konten, dan kategori wajib diisi' },
        { status: 400 }
      );
    }

    const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const docRef = adminDb.collection('artikel').doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }
    
    const currentData = (docSnap.data() as ArticleData | undefined) ?? {};
    let valueJson = currentData.value ?? null;
    let imagekitFileId = typeof currentData.imagekit_file_id === 'string' ? currentData.imagekit_file_id : '';
    let replacedImagekitFileId = '';

    if (imageFile && imageFile.name) {
      const upload = await uploadArtikelImage(imageFile, slug);
      valueJson = JSON.stringify({ image: upload.url });
      replacedImagekitFileId = imagekitFileId;
      imagekitFileId = upload.fileId;
    }

    await docRef.update({
      Judul: judul,
      Slug: slug,
      isi_artikel: isi_artikel,
      status: status || 'draft',
      kategori: kategori,
      value: valueJson,
      imagekit_file_id: imagekitFileId || null,
      instagram_url: instagramUrl || null,
      updated_at: new Date().toISOString()
    });

    if (imageFile && replacedImagekitFileId) {
      try {
        await deleteImageKitFile(replacedImagekitFileId);
      } catch (error) {
        console.error('Delete replaced ImageKit article image error:', error);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Data berhasil diupdate' },
      { status: 200 }
    );
  } catch (error: unknown) {
    return getErrorResponse(error, 'Terjadi kesalahan pada server saat memperbarui artikel');
  }
}
