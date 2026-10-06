import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const snapshot = await adminDb.collection('berita')
      .orderBy('tanggal', 'desc')
      .get();
      
    const rows = snapshot.docs.map((doc: any) => {
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
        penulis: data.penulis || 'Admin'
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
    const imageFile = formData.get('image') as File | null;
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

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(imageFile.name);
      const filename = `${slug}-${uniqueSuffix}${ext}`;
      
      const uploadDir = path.join(process.cwd(), 'public/upload/news');
      await fs.mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);
      
      imageUrl = `/upload/news/${filename}`;
    }

    const tanggal = new Date().toISOString().split('T')[0];

    const newData = {
      Judul: judul,
      Slug: slug,
      image: imageUrl,
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

    await adminDb.collection('berita').doc(id).delete();

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
    const imageFile = formData.get('image') as File | null;
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
    
    let imageUrl = doc.data()?.image || '';

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(imageFile.name);
      const filename = `${slug}-${uniqueSuffix}${ext}`;
      
      const uploadDir = path.join(process.cwd(), 'public/upload/news');
      await fs.mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);
      
      imageUrl = `/upload/news/${filename}`;
    }

    const updateData: any = {
      Judul: judul,
      Slug: slug,
      image: imageUrl,
      isi_berita: isi_berita,
      status: status || 'draft',
      kategori: kategori,
      instagram_url: instagram_url || null,
    };
    
    if (penulis) {
      updateData.penulis = penulis;
    }

    await docRef.update(updateData);

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
