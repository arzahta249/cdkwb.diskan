import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';
import { deleteImageKitFile, uploadImageKitFile } from '@/lib/imagekit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function getImageFile(formData: FormData) {
  const value = formData.get('image');
  return value instanceof File && value.size > 0 ? value : null;
}

function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Format gambar harus JPG, PNG, atau WEBP.');
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Ukuran gambar maksimal 2MB.');
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb.collection('berita')
      .orderBy('tanggal', 'desc')
      .get();
      
    const rows = snapshot.docs.map((doc: { id: string; data: () => Record<string, unknown> }) => {
      const data = doc.data();
      return {
        ID_berita: doc.id,
        Judul: data.Judul,
        Slug: data.Slug,
        image: data.image,
        isi_berita: data.isi_berita,
        status: data.status,
        tanggal: data.tanggal,
        kategori: data.kategori,
        instagram_url: data.instagram_url,
        is_leading: data.is_leading,
      penulis: typeof data.penulis === 'string' ? data.penulis : 'Admin'
      };
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch news error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const formData = await request.formData();
    
    const judul = formData.get('judul') as string;
    const isi_berita = formData.get('isi_berita') as string;
    const status = formData.get('status') as string;
    const kategori = (formData.get('kategori') as string) || 'Umum';
    const penulis = (formData.get('penulis') as string) || 'Admin';
    const type = (formData.get('type') as string) || 'berita';
    const imageFile = getImageFile(formData);
    const instagram_url = formData.get('instagramUrl') as string | null;

    if (!judul || !isi_berita) {
      return NextResponse.json(
        { error: 'Judul dan isi konten wajib diisi' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let imageUrl = '';
    let imagekitFileId = '';

    if (imageFile) {
      validateImage(imageFile);
      const upload = await uploadImageKitFile(imageFile, slug);
      imageUrl = upload.url;
      imagekitFileId = upload.fileId;
    }

    const tanggal = new Date().toISOString().split('T')[0];

    const newData = {
      Judul: judul,
      Slug: slug,
      image: imageUrl,
      imagekit_file_id: imagekitFileId || null,
      isi_berita: isi_berita,
      status: status || 'draft',
      tanggal: tanggal,
      id_penulis: token ? parseInt(token) : null,
      penulis: penulis,
      kategori: kategori,
      instagram_url: instagram_url || null,
      type: type,
      created_at: new Date()
    };

    const docRef = await adminDb.collection('berita').add(newData);

    return NextResponse.json(
      { success: true, message: 'Data berhasil dibuat', id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create content error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat menyimpan data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('berita').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });

    const imagekitFileId = doc.data()?.imagekit_file_id;
    await docRef.delete();
    if (typeof imagekitFileId === 'string' && imagekitFileId) {
      try {
        await deleteImageKitFile(imagekitFileId);
      } catch (error) {
        console.error('Delete ImageKit image error:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete berita error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const judul = formData.get('judul') as string;
    const isi_berita = formData.get('isi_berita') as string;
    const status = formData.get('status') as string;
    const kategori = (formData.get('kategori') as string) || 'Umum';
    const penulis = formData.get('penulis') as string | null;
    const imageFile = getImageFile(formData);
    const instagram_url = formData.get('instagramUrl') as string | null;

    if (!id || !judul || !isi_berita) {
      return NextResponse.json(
        { error: 'ID, Judul, dan isi konten wajib diisi' },
        { status: 400 }
      );
    }

    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const docRef = adminDb.collection('berita').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }
    
    const currentData = doc.data() || {};
    let imageUrl = typeof currentData.image === 'string' ? currentData.image : '';
    let imagekitFileId = typeof currentData.imagekit_file_id === 'string' ? currentData.imagekit_file_id : '';
    let replacedImagekitFileId = '';

    if (imageFile) {
      validateImage(imageFile);
      const upload = await uploadImageKitFile(imageFile, slug);
      replacedImagekitFileId = imagekitFileId;
      imageUrl = upload.url;
      imagekitFileId = upload.fileId;

      // The old file is removed only after the Firestore document points to
      // the new URL, so an update failure never leaves a broken image link.
    }

    const updateData: Record<string, unknown> = {
      Judul: judul,
      Slug: slug,
      image: imageUrl,
      imagekit_file_id: imagekitFileId || null,
      isi_berita: isi_berita,
      status: status || 'draft',
      kategori: kategori,
      instagram_url: instagram_url || null,
    };
    
    if (penulis) {
      updateData.penulis = penulis;
    }

    await docRef.update(updateData);

    if (imageFile && replacedImagekitFileId) {
      try {
        await deleteImageKitFile(replacedImagekitFileId);
      } catch (error) {
        console.error('Delete replaced ImageKit image error:', error);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Data berhasil diupdate' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update content error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat update data' },
      { status: 500 }
    );
  }
}
