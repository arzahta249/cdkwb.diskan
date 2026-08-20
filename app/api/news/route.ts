import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams: any[] = [];
    let query = `
      SELECT b.ID_berita, b.Judul, b.Slug, b.image, b.isi_berita, b.status, b.tanggal, b.kategori, b.instagram_url, u.nama as penulis 
      FROM berita b
      LEFT JOIN user u ON b.id_penulis = u.ID_user
    `;

    query += ' ORDER BY tanggal DESC';

    const [rows]: any = await pool.query(query, queryParams);
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

    const [result]: any = await pool.query(
      'INSERT INTO berita (Judul, Slug, image, isi_berita, status, tanggal, id_penulis, kategori, instagram_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, slug, imageUrl, isi_berita, status || 'draft', tanggal, token ? parseInt(token) : null, kategori, instagram_url || null]
    );

    return NextResponse.json(
      { success: true, message: 'Data berhasil dibuat', id: result.insertId },
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

    const [result]: any = await pool.query('DELETE FROM berita WHERE ID_berita = ?', [id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 });
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

    // Get old image if new one not provided
    const [oldRows]: any = await pool.query('SELECT image FROM berita WHERE ID_berita = ?', [id]);
    if (oldRows.length === 0) {
      return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
    }
    
    let imageUrl = oldRows[0].image;

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

    const [result]: any = await pool.query(
      'UPDATE berita SET Judul=?, Slug=?, image=?, isi_berita=?, status=?, kategori=?, instagram_url=? WHERE ID_berita=?',
      [judul, slug, imageUrl, isi_berita, status || 'draft', kategori, instagram_url || null, id]
    );

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
