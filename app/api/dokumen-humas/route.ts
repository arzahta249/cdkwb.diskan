import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET: all documents
export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM dokumen_humas ORDER BY urutan ASC, created_at DESC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Dokumen humas GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data dokumen' }, { status: 500 });
  }
}

// POST: create new document
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, file_url, tipe, ukuran, warna, urutan } = body;

    if (!judul || !file_url) {
      return NextResponse.json({ error: 'Judul dan URL file wajib diisi' }, { status: 400 });
    }

    const [result]: any = await pool.query(
      'INSERT INTO dokumen_humas (judul, deskripsi, file_url, tipe, ukuran, warna, urutan) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [judul, deskripsi || '', file_url, tipe || 'PDF', ukuran || '', warna || '#0ea5e9', urutan || 0]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Dokumen humas POST error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan dokumen' }, { status: 500 });
  }
}

// DELETE: delete by ?id=
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });

    const [result]: any = await pool.query('DELETE FROM dokumen_humas WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Dokumen tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Dokumen berhasil dihapus' });
  } catch (error) {
    console.error('Dokumen humas DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus dokumen' }, { status: 500 });
  }
}

// PUT: update document by id in body
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, judul, deskripsi, file_url, tipe, ukuran, warna, urutan } = body;

    if (!id || !judul || !file_url) {
      return NextResponse.json({ error: 'ID, Judul, dan URL file wajib diisi' }, { status: 400 });
    }

    await pool.query(
      'UPDATE dokumen_humas SET judul=?, deskripsi=?, file_url=?, tipe=?, ukuran=?, warna=?, urutan=? WHERE id=?',
      [judul, deskripsi || '', file_url, tipe || 'PDF', ukuran || '', warna || '#0ea5e9', urutan || 0, id]
    );

    return NextResponse.json({ success: true, message: 'Dokumen berhasil diperbarui' });
  } catch (error) {
    console.error('Dokumen humas PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui dokumen' }, { status: 500 });
  }
}
