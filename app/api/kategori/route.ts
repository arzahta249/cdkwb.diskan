import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT ID_kategori, name_kategori FROM kategory_artikel');
    return NextResponse.json({ success: true, categories: rows });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data kategori' }, { status: 500 });
  }
}
