import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET: fetch news with kategori = 'Siaran Pers', published only (public)
export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT
        b.ID_berita,
        b.Judul,
        b.Slug,
        b.image,
        b.isi_berita,
        b.status,
        b.tanggal,
        b.kategori,
        u.nama as penulis
      FROM berita b
      LEFT JOIN user u ON b.id_penulis = u.ID_user
      WHERE b.kategori = 'Siaran Pers' AND b.status = 'published'
      ORDER BY b.tanggal DESC
      LIMIT 6
    `);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Siaran pers fetch error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data siaran pers' }, { status: 500 });
  }
}
