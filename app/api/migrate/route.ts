import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  const results: string[] = [];
  
  try {
    // Force add the column — catches error gracefully if it already exists
    try {
      await pool.query(`ALTER TABLE berita ADD COLUMN IF NOT EXISTS kategori VARCHAR(100) NOT NULL DEFAULT 'Umum'`);
      await pool.query(`ALTER TABLE berita ADD COLUMN IF NOT EXISTS instagram_url VARCHAR(500) NULL`);
      await pool.query(`ALTER TABLE berita ADD COLUMN IF NOT EXISTS is_leading TINYINT(1) DEFAULT 0`);
      await pool.query(`ALTER TABLE berita ADD COLUMN IF NOT EXISTS id_penulis INT NULL`);
      await pool.query(`ALTER TABLE berita ADD COLUMN IF NOT EXISTS penulis VARCHAR(150) DEFAULT 'Admin'`);
      results.push('SUCCESS: kolom berita siap');
    } catch (err: any) {
      results.push(`INFO: kolom berita (${err.message})`);
    }

    try {
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS isi_artikel LONGTEXT NULL`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS kategori VARCHAR(100) DEFAULT 'Umum'`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS penulis VARCHAR(150) DEFAULT 'Admin'`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS id_penulis INT NULL`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS image VARCHAR(255) NULL`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS instagram_url VARCHAR(500) NULL`);
      await pool.query(`ALTER TABLE artikel ADD COLUMN IF NOT EXISTS is_leading TINYINT(1) DEFAULT 0`);
      results.push('SUCCESS: kolom artikel siap');
    } catch (err: any) {
      results.push(`INFO: kolom artikel (${err.message})`);
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

    // ── Galeri Tables ────────────────────────────────────────────────

    // kategory_foto
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kategory_foto (
          ID_kategori INT AUTO_INCREMENT PRIMARY KEY,
          name_kategori VARCHAR(100) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      // Seed default categories
      await pool.query(`
        INSERT IGNORE INTO kategory_foto (name_kategori)
        VALUES ('Konservasi'), ('Pengawasan'), ('Operasional'), ('Kegiatan'), ('Dokumentasi'), ('Kehumasan');
      `);
      results.push('SUCCESS: tabel kategory_foto siap');
    } catch (err: any) {
      results.push(`INFO: error kategory_foto (${err.message})`);
    }

    // kategory_video
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kategory_video (
          ID_kategori INT AUTO_INCREMENT PRIMARY KEY,
          name_kategori VARCHAR(100) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      await pool.query(`
        INSERT IGNORE INTO kategory_video (name_kategori)
        VALUES ('Konservasi'), ('Pengawasan'), ('Operasional'), ('Kegiatan'), ('Dokumentasi'), ('Kehumasan');
      `);
      results.push('SUCCESS: tabel kategory_video siap');
    } catch (err: any) {
      results.push(`INFO: error kategory_video (${err.message})`);
    }

    // kategory_infografis
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kategory_infografis (
          ID_kategori INT AUTO_INCREMENT PRIMARY KEY,
          name_kategori VARCHAR(100) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      await pool.query(`
        INSERT IGNORE INTO kategory_infografis (name_kategori)
        VALUES ('Konservasi'), ('Pengawasan'), ('Operasional'), ('Kegiatan'), ('Dokumentasi'), ('Kehumasan');
      `);
      results.push('SUCCESS: tabel kategory_infografis siap');
    } catch (err: any) {
      results.push(`INFO: error kategory_infografis (${err.message})`);
    }

    // foto
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS foto (
          ID_foto INT AUTO_INCREMENT PRIMARY KEY,
          Judul VARCHAR(255) NOT NULL,
          Slug VARCHAR(255) NOT NULL UNIQUE,
          URL_image VARCHAR(500) NULL,
          status VARCHAR(50) DEFAULT 'Aktif',
          tanggal DATE NULL,
          id_kategory INT NULL,
          value JSON NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_kategory) REFERENCES kategory_foto(ID_kategori) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel foto siap');
    } catch (err: any) {
      results.push(`INFO: error tabel foto (${err.message})`);
    }

    // video
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS video (
          ID_video INT AUTO_INCREMENT PRIMARY KEY,
          Judul VARCHAR(255) NOT NULL,
          Slug VARCHAR(255) NOT NULL UNIQUE,
          URL_thumbnail VARCHAR(500) NULL,
          URL_video VARCHAR(500) NULL,
          durasi_video VARCHAR(20) NULL,
          status VARCHAR(50) DEFAULT 'Aktif',
          tanggal DATE NULL,
          id_kategory INT NULL,
          value JSON NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_kategory) REFERENCES kategory_video(ID_kategori) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel video siap');
    } catch (err: any) {
      results.push(`INFO: error tabel video (${err.message})`);
    }

    // infografis
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS infografis (
          ID_infografis INT AUTO_INCREMENT PRIMARY KEY,
          Judul VARCHAR(255) NOT NULL,
          Slug VARCHAR(255) NOT NULL UNIQUE,
          URL_thumbnail VARCHAR(500) NULL,
          URL_dokumen VARCHAR(500) NULL,
          status VARCHAR(50) DEFAULT 'Aktif',
          tanggal DATE NULL,
          id_kategory INT NULL,
          value JSON NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_kategory) REFERENCES kategory_infografis(ID_kategori) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel infografis siap');
    } catch (err: any) {
      results.push(`INFO: error tabel infografis (${err.message})`);
    }

    // ── Artikel Tables ────────────────────────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kategory_artikel (
          ID_kategori INT AUTO_INCREMENT PRIMARY KEY,
          name_kategori VARCHAR(100) NOT NULL UNIQUE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      await pool.query(`
        INSERT IGNORE INTO kategory_artikel (name_kategori)
        VALUES ('Kelautan'), ('Perikanan'), ('Konservasi'), ('Edukasi'), ('Umum');
      `);
      results.push('SUCCESS: tabel kategory_artikel siap');
    } catch (err: any) {
      results.push(`INFO: error kategory_artikel (${err.message})`);
    }

    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS artikel (
          ID_artikel INT AUTO_INCREMENT PRIMARY KEY,
          Judul VARCHAR(255) NOT NULL,
          Slug VARCHAR(255) NOT NULL UNIQUE,
          status VARCHAR(50) DEFAULT 'draft',
          tanggal DATE NULL,
          id_kategori INT NULL,
          value JSON NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_kategori) REFERENCES kategory_artikel(ID_kategori) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel artikel siap');
    } catch (err: any) {
      results.push(`INFO: error tabel artikel (${err.message})`);
    }

    // ── Materi Table ──────────────────────────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS materi (
          id INT AUTO_INCREMENT PRIMARY KEY,
          judul VARCHAR(255) NOT NULL,
          deskripsi TEXT NULL,
          kategori VARCHAR(100) NOT NULL,
          file_url VARCHAR(255) NOT NULL,
          file_type VARCHAR(20) NOT NULL,
          file_size VARCHAR(50) NOT NULL,
          is_verified TINYINT(1) DEFAULT 1,
          status ENUM('published', 'draft') DEFAULT 'published',
          tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      results.push('SUCCESS: tabel materi siap');
    } catch (err: any) {
      results.push(`INFO: error tabel materi (${err.message})`);
    }

    // ── Kehumasan: Dokumen Humas Table ────────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS dokumen_humas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          judul VARCHAR(255) NOT NULL,
          deskripsi TEXT,
          file_url VARCHAR(500) NOT NULL,
          tipe VARCHAR(50) DEFAULT 'PDF',
          ukuran VARCHAR(30) DEFAULT '',
          warna VARCHAR(20) DEFAULT '#0ea5e9',
          urutan INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      results.push('SUCCESS: tabel dokumen_humas siap');
    } catch (err: any) {
      results.push(`INFO: error tabel dokumen_humas (${err.message})`);
    }

    // ── Kehumasan: Kerjasama Table ─────────────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kerjasama (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nama_mitra VARCHAR(255) NOT NULL,
          singkatan VARCHAR(100) DEFAULT '',
          kategori ENUM('akademik', 'teknis', 'pokmaswas') DEFAULT 'akademik',
          nomor_pks_mitra VARCHAR(255) NOT NULL,
          nomor_pks_dinas VARCHAR(255) DEFAULT '',
          tanggal_pks VARCHAR(100) NOT NULL,
          jangka_waktu VARCHAR(100) NOT NULL,
          status ENUM('aktif', 'perpanjangan', 'tetap') DEFAULT 'aktif',
          level VARCHAR(100) DEFAULT 'Provinsi Jawa Tengah',
          penandatangan VARCHAR(255) DEFAULT '',
          ringkasan TEXT,
          ruang_lingkup TEXT,
          prodi_terlibat TEXT,
          keluaran_program TEXT,
          pendanaan VARCHAR(255) DEFAULT '',
          file_dokumen_url VARCHAR(500) DEFAULT '',
          urutan INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      results.push('SUCCESS: tabel kerjasama siap');
    } catch (err: any) {
      results.push(`INFO: error tabel kerjasama (${err.message})`);
    }

    // ── Magang: Pendaftaran Magang Table ──────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS pendaftaran_magang (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nama VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          nomor_ponsel VARCHAR(20) NULL,
          domisili VARCHAR(255) NULL,
          universitas VARCHAR(255) NOT NULL,
          jurusan VARCHAR(255) NOT NULL,
          posisi VARCHAR(100) NOT NULL,
          motivasi_cv TEXT NOT NULL,
          cv_file VARCHAR(255) NULL,
          status ENUM('PENDING', 'DITERIMA', 'DITOLAK') DEFAULT 'PENDING',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      results.push('SUCCESS: tabel pendaftaran_magang siap');
    } catch (err: any) {
      results.push(`INFO: error tabel pendaftaran_magang (${err.message})`);
    }

    // ── End Tables ───────────────────────────────────────────────────

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
