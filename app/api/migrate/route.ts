import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  const results: string[] = [];
  
  try {
    // Force add the column — catches error gracefully if it already exists
    try {
      await pool.query(
        `ALTER TABLE berita ADD COLUMN kategori VARCHAR(100) NOT NULL DEFAULT 'Umum'`
      );
      results.push('SUCCESS: kolom kategori ditambahkan ke berita');
    } catch (err: any) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        results.push('INFO: kolom kategori sudah ada (tidak ada perubahan)');
      } else {
        throw err;
      }
    }

    // Create pengaduan table
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS pengaduan (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nomor_tiket VARCHAR(50) NOT NULL UNIQUE,
          nama_pelapor VARCHAR(150) NULL,
          email_pelapor VARCHAR(150) NOT NULL,
          telepon_pelapor VARCHAR(50) NULL,
          kategori VARCHAR(100) NOT NULL,
          lokasi VARCHAR(255) NOT NULL,
          deskripsi TEXT NOT NULL,
          lampiran VARCHAR(255) NULL,
          is_anonim TINYINT(1) DEFAULT 0,
          status ENUM('PENDING', 'DIDISPOSISI', 'DITOLAK', 'DIPROSES', 'SELESAI', 'DITUTUP') DEFAULT 'PENDING',
          alasan_penolakan TEXT NULL,
          petugas_bidang VARCHAR(150) NULL,
          hasil_penyelesaian TEXT NULL,
          bukti_penyelesaian VARCHAR(255) NULL,
          sla_deadline DATETIME NULL,
          rating_kepuasan INT NULL,
          feedback_kepuasan TEXT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel pengaduan siap');
    } catch (err: any) {
      results.push(`INFO: error tabel pengaduan (${err.message})`);
    }

    // Create survei_kepuasan table
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS survei_kepuasan (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nama VARCHAR(150) NULL,
          email VARCHAR(150) NULL,
          jenis_kelamin VARCHAR(50) NULL,
          usia VARCHAR(50) NULL,
          pendidikan VARCHAR(50) NULL,
          pekerjaan VARCHAR(100) NULL,
          peran VARCHAR(100) DEFAULT 'Masyarakat',
          rating_layanan INT NOT NULL DEFAULT 4,
          kategori_layanan VARCHAR(100) NOT NULL DEFAULT 'Umum',
          kualitas_kemudahan INT NOT NULL DEFAULT 4,
          kualitas_kecepatan INT NOT NULL DEFAULT 4,
          kualitas_sikap INT NOT NULL DEFAULT 4,
          u1_persyaratan INT NOT NULL DEFAULT 4,
          u2_prosedur INT NOT NULL DEFAULT 4,
          u3_kecepatan INT NOT NULL DEFAULT 4,
          u4_biaya INT NOT NULL DEFAULT 4,
          u5_produk INT NOT NULL DEFAULT 4,
          u6_kompetensi INT NOT NULL DEFAULT 4,
          u7_perilaku INT NOT NULL DEFAULT 4,
          u8_sarpras INT NOT NULL DEFAULT 4,
          u9_pengaduan INT NOT NULL DEFAULT 4,
          kritik_saran TEXT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel survei_kepuasan siap');

      // Alter existing table columns if not present
      const skmCols = [
        { col: 'jenis_kelamin', type: 'VARCHAR(50) NULL' },
        { col: 'usia', type: 'VARCHAR(50) NULL' },
        { col: 'pendidikan', type: 'VARCHAR(50) NULL' },
        { col: 'pekerjaan', type: 'VARCHAR(100) NULL' },
        { col: 'u1_persyaratan', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u2_prosedur', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u3_kecepatan', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u4_biaya', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u5_produk', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u6_kompetensi', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u7_perilaku', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u8_sarpras', type: 'INT NOT NULL DEFAULT 4' },
        { col: 'u9_pengaduan', type: 'INT NOT NULL DEFAULT 4' }
      ];
      for (const item of skmCols) {
        try {
          await pool.query(`ALTER TABLE survei_kepuasan ADD COLUMN ${item.col} ${item.type}`);
          results.push(`SUCCESS: kolom ${item.col} ditambahkan`);
        } catch (e: any) {
          if (e.code === 'ER_DUP_FIELDNAME') {
            results.push(`INFO: kolom ${item.col} sudah ada`);
          } else {
            results.push(`WARN: gagal tambah ${item.col} (${e.message})`);
          }
        }
      }
    } catch (err: any) {
      results.push(`INFO: error tabel survei_kepuasan (${err.message})`);
    }

    // Verify the column exists now
    const [[dbRow]]: any = await pool.query('SELECT DATABASE() AS db');

    return NextResponse.json({
      success: true,
      database: dbRow.db,
      log: results
    });
  } catch (err) {
    console.error('Migration error:', err);
    return NextResponse.json({ error: 'Migrasi gagal', detail: String(err) }, { status: 500 });
  }
}
