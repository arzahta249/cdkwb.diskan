import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import { convertTimestamps } from '@/lib/firebase-utils';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('artikel').orderBy('tanggal', 'desc').get();
    const rows = snapshot.docs.map((doc: any) => ({ ID_artikel: doc.id, ...convertTimestamps(doc.data()) }));
    
    // Add default author name to mimic old SQL join
    rows.forEach((r: any) => {
      r.nama_penulis = r.penulis || 'Admin';
    });

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('Fetch artikel error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data artikel', details: error?.message, stack: error?.stack },
      { status: 200 }
    );
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
    
    const judul = formData.get('judul') as string;
    const isi_artikel = formData.get('isi_artikel') as string;
    const status = formData.get('status') as string;
    const kategori = formData.get('kategori') as string;
    const instagram_url = formData.get('instagramUrl') as string | null;
    const imageFile = formData.get('image') as File | null;

    if (!judul || !isi_artikel || !kategori) {
      return NextResponse.json(
        { error: 'Judul, Kategori, dan Isi Artikel wajib diisi' },
        { status: 400 }
      );
    }

    const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let imageUrl = '';

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `artikel/${slug}-${uniqueSuffix}`;
      
      const bucket = getStorage().bucket();
      const file = bucket.file(filename);
      await file.save(buffer, { contentType: imageFile.type || 'image/jpeg' });
      await file.makePublic();
      imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
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
      instagram_url: instagram_url || null,
      created_at: tanggal,
      updated_at: tanggal
    });

    return NextResponse.json(
      { success: true, message: 'Artikel berhasil dibuat', id: docRef.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create artikel error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat membuat artikel', details: error?.message, stack: error?.stack },
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

    await adminDb.collection('artikel').doc(id).delete();

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    console.error('Delete artikel error:', error);
    return NextResponse.json({ error: 'Server error', details: error?.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    
    const id = formData.get('id') as string;
    const judul = formData.get('judul') as string;
    const isi_artikel = formData.get('isi_artikel') as string;
    const status = formData.get('status') as string;
    const kategori = formData.get('kategori') as string;
    const instagram_url = formData.get('instagramUrl') as string | null;
    const imageFile = formData.get('image') as File | null;

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
    
    let valueJson = docSnap.data()?.value;

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `artikel/${slug}-${uniqueSuffix}`;
      
      const bucket = getStorage().bucket();
      const file = bucket.file(filename);
      await file.save(buffer, { contentType: imageFile.type || 'image/jpeg' });
      await file.makePublic();
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      valueJson = JSON.stringify({ image: imageUrl });
    }

    await docRef.update({
      Judul: judul,
      Slug: slug,
      isi_artikel: isi_artikel,
      status: status || 'draft',
      kategori: kategori,
      value: valueJson,
      instagram_url: instagram_url || null,
      updated_at: new Date().toISOString()
    });

    return NextResponse.json(
      { success: true, message: 'Data berhasil diupdate' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update artikel error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat update data', details: error?.message, stack: error?.stack },
      { status: 500 }
    );
  }
}
