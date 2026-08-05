import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let query = 'SELECT ID_berita, Judul, Slug, image, isi_berita, status, tanggal, type, penulis, kategori FROM berita';
    const queryParams: any[] = [];

    if (type) {
      query += ' WHERE type = ?';
      queryParams.push(type);
    }

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
    const formData = await request.formData();
    
    const judul = formData.get('judul') as string;
    const isi_berita = formData.get('isi_berita') as string;
    const status = formData.get('status') as string;
    const type = (formData.get('type') as string) || 'berita';
    const penulis = (formData.get('penulis') as string) || 'Reynard';
    const kategori = (formData.get('kategori') as string) || 'Umum';
    const imageFile = formData.get('image') as File | null;

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
      'INSERT INTO berita (Judul, Slug, image, isi_berita, status, tanggal, type, penulis, kategori) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, slug, imageUrl, isi_berita, status || 'draft', tanggal, type, penulis, kategori]
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
