import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { uploadFile } from '@/lib/upload';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const nama = formData.get('nama') as string;
    const email = formData.get('email') as string;
    const universitas = formData.get('universitas') as string;
    const jurusan = formData.get('jurusan') as string;
    const posisi = formData.get('posisi') as string;
    const nomor_ponsel = formData.get('nomor_ponsel') as string;
    const domisili = formData.get('domisili') as string;
    const motivasi_cv = formData.get('motivasi_cv') as string;
    const cvFile = formData.get('cv_file') as File | null;
    
    // Validasi sederhana
    if (!nama || !email || !universitas || !jurusan || !posisi || !motivasi_cv || !nomor_ponsel || !domisili) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    let cvFilePath = null;
    if (cvFile && cvFile.size > 0) {
      // lib/upload.ts saves to /upload/galeri, which is fine, or we can use it directly
      cvFilePath = await uploadFile(cvFile);
    }
    
    // Insert with default status 'pending'
    const query = `
      INSERT INTO pendaftaran_magang (nama, email, universitas, jurusan, posisi, nomor_ponsel, domisili, motivasi_cv, cv_file)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [
      nama, 
      email, 
      universitas, 
      jurusan, 
      posisi, 
      nomor_ponsel,
      domisili,
      motivasi_cv,
      cvFilePath
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
      SELECT id, nama, email, universitas, jurusan, posisi, nomor_ponsel, domisili, motivasi_cv, cv_file, status, created_at
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
