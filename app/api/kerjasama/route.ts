import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET: list all partnerships
export async function GET() {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM kerjasama ORDER BY urutan ASC, id ASC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Kerjasama GET error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data kerjasama' }, { status: 500 });
  }
}

// POST: create new partnership
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nama_mitra,
      singkatan,
      kategori,
      nomor_pks_mitra,
      nomor_pks_dinas,
      tanggal_pks,
      jangka_waktu,
      status,
      level,
      penandatangan,
      ringkasan,
      ruang_lingkup,
      prodi_terlibat,
      keluaran_program,
      pendanaan,
      file_dokumen_url,
      urutan
    } = body;

    if (!nama_mitra || !nomor_pks_mitra || !tanggal_pks || !jangka_waktu) {
      return NextResponse.json({ 
        error: 'Nama Mitra, Nomor PKS, Tanggal, dan Jangka Waktu wajib diisi' 
      }, { status: 400 });
    }

    const scopeStr = typeof ruang_lingkup === 'object' ? JSON.stringify(ruang_lingkup) : (ruang_lingkup || '[]');
    const outputStr = typeof keluaran_program === 'object' ? JSON.stringify(keluaran_program) : (keluaran_program || '');

    const [result]: any = await pool.query(
      `INSERT INTO kerjasama (
        nama_mitra, singkatan, kategori, nomor_pks_mitra, nomor_pks_dinas,
        tanggal_pks, jangka_waktu, status, level, penandatangan,
        ringkasan, ruang_lingkup, prodi_terlibat, keluaran_program,
        pendanaan, file_dokumen_url, urutan
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nama_mitra,
        singkatan || '',
        kategori || 'akademik',
        nomor_pks_mitra,
        nomor_pks_dinas || '',
        tanggal_pks,
        jangka_waktu,
        status || 'aktif',
        level || 'Provinsi Jawa Tengah',
        penandatangan || '',
        ringkasan || '',
        scopeStr,
        prodi_terlibat || '',
        outputStr,
        pendanaan || '',
        file_dokumen_url || '',
        urutan || 0
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Kerjasama POST error:', error);
    return NextResponse.json({ error: 'Gagal menambahkan data kerjasama' }, { status: 500 });
  }
}

// PUT: update partnership
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      nama_mitra,
      singkatan,
      kategori,
      nomor_pks_mitra,
      nomor_pks_dinas,
      tanggal_pks,
      jangka_waktu,
      status,
      level,
      penandatangan,
      ringkasan,
      ruang_lingkup,
      prodi_terlibat,
      keluaran_program,
      pendanaan,
      file_dokumen_url,
      urutan
    } = body;

    if (!id || !nama_mitra || !nomor_pks_mitra) {
      return NextResponse.json({ error: 'ID, Nama Mitra, dan Nomor PKS wajib diisi' }, { status: 400 });
    }

    const scopeStr = typeof ruang_lingkup === 'object' ? JSON.stringify(ruang_lingkup) : (ruang_lingkup || '[]');
    const outputStr = typeof keluaran_program === 'object' ? JSON.stringify(keluaran_program) : (keluaran_program || '');

    await pool.query(
      `UPDATE kerjasama SET 
        nama_mitra=?, singkatan=?, kategori=?, nomor_pks_mitra=?, nomor_pks_dinas=?,
        tanggal_pks=?, jangka_waktu=?, status=?, level=?, penandatangan=?,
        ringkasan=?, ruang_lingkup=?, prodi_terlibat=?, keluaran_program=?,
        pendanaan=?, file_dokumen_url=?, urutan=?
      WHERE id=?`,
      [
        nama_mitra,
        singkatan || '',
        kategori || 'akademik',
        nomor_pks_mitra,
        nomor_pks_dinas || '',
        tanggal_pks,
        jangka_waktu,
        status || 'aktif',
        level || 'Provinsi Jawa Tengah',
        penandatangan || '',
        ringkasan || '',
        scopeStr,
        prodi_terlibat || '',
        outputStr,
        pendanaan || '',
        file_dokumen_url || '',
        urutan || 0,
        id
      ]
    );

    return NextResponse.json({ success: true, message: 'Data kerjasama berhasil diperbarui' });
  } catch (error) {
    console.error('Kerjasama PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui data kerjasama' }, { status: 500 });
  }
}

// DELETE: delete partnership by ?id=
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });

    const [result]: any = await pool.query('DELETE FROM kerjasama WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Data kerjasama tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Data kerjasama berhasil dihapus' });
  } catch (error) {
    console.error('Kerjasama DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus data kerjasama' }, { status: 500 });
  }
}
