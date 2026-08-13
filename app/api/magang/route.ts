import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validasi sederhana
    if (!data.nama || !data.email || !data.universitas || !data.jurusan || !data.posisi || !data.motivasi_cv) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }
    
    // Insert with default status 'pending'
    const query = `
      INSERT INTO pendaftaran_magang (nama, email, universitas, jurusan, posisi, motivasi_cv)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [
      data.nama, 
      data.email, 
      data.universitas, 
      data.jurusan, 
      data.posisi, 
      data.motivasi_cv
    ]);
    
    return NextResponse.json({ success: true, message: 'Pendaftaran berhasil dikirim' }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/magang:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const query = `
      SELECT id, nama, email, universitas, jurusan, posisi, motivasi_cv, status, created_at
      FROM pendaftaran_magang
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.query(query);
    
    return NextResponse.json({ success: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/magang:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'ID dan status wajib diisi' }, { status: 400 });
    }

    const query = `UPDATE pendaftaran_magang SET status = ? WHERE id = ?`;
    await pool.query(query, [status, id]);
    
    return NextResponse.json({ success: true, message: 'Status berhasil diubah' }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/magang:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID wajib diisi' }, { status: 400 });
    }

    const query = `DELETE FROM pendaftaran_magang WHERE id = ?`;
    await pool.query(query, [id]);
    
    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/magang:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
