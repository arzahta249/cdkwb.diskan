import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT ID_berita, Judul, Slug, image, isi_berita, status, tanggal FROM berita ORDER BY tanggal DESC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch news error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data berita' },
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
    const imageFile = formData.get('image') as File | null;

    if (!judul || !isi_berita) {
      return NextResponse.json(
        { error: 'Judul dan isi berita wajib diisi' },
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

      // Pastikan nama unik
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(imageFile.name);
      const filename = `${slug}-${uniqueSuffix}${ext}`;
      
      const uploadDir = path.join(process.cwd(), 'public/upload/news');
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);
      
      imageUrl = `/upload/news/${filename}`;
    }

    const tanggal = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const [result]: any = await pool.query(
      'INSERT INTO berita (Judul, Slug, image, isi_berita, status, tanggal) VALUES (?, ?, ?, ?, ?, ?)',
      [judul, slug, imageUrl, isi_berita, status || 'draft', tanggal]
    );

    return NextResponse.json(
      { success: true, message: 'Berita berhasil dibuat', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create news error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat membuat berita' },
      { status: 500 }
    );
  }
}
