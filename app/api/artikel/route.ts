import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { pool } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT 
        a.ID_artikel, 
        a.Judul, 
        a.Slug, 
        a.status, 
        a.tanggal, 
        a.value, 
        a.kategori,
        u.nama as nama_penulis
      FROM artikel a
      LEFT JOIN user u ON a.id_penulis = u.ID_user
      ORDER BY a.tanggal DESC
    `);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch artikel error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data artikel' },
      { status: 500 }
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
    const imageFile = formData.get('image') as File | null;

    if (!judul || !isi_artikel || !kategori) {
      return NextResponse.json(
        { error: 'Judul, Kategori, dan Isi Artikel wajib diisi' },
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
      
      const uploadDir = path.join(process.cwd(), 'public/upload/artikel');
      
      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      
      imageUrl = `/upload/artikel/${filename}`;
    }

    const valueJson = imageUrl ? JSON.stringify({ image: imageUrl }) : null;
    const tanggal = new Date().toISOString().split('T')[0];

    const [result]: any = await pool.query(
      'INSERT INTO artikel (Judul, Slug, isi_artikel, status, tanggal, id_penulis, kategori, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, slug, isi_artikel, status || 'draft', tanggal, parseInt(token), kategori, valueJson]
    );

    return NextResponse.json(
      { success: true, message: 'Artikel berhasil dibuat', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create artikel error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat membuat artikel' },
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

    const [result]: any = await pool.query('DELETE FROM artikel WHERE ID_artikel = ?', [id]);
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete artikel error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
