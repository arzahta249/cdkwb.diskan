import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'diskan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createTable() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
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
    console.log('✅  Table dokumen_humas created (or already exists).');

    // Seed with some initial documents so the page isn't empty
    const [existing] = await conn.query('SELECT COUNT(*) as cnt FROM dokumen_humas');
    if (existing[0].cnt === 0) {
      await conn.query(`
        INSERT INTO dokumen_humas (judul, deskripsi, file_url, tipe, ukuran, warna, urutan) VALUES
        ('Laporan Tahunan CDKWB 2025', 'Ringkasan capaian program, data statistik, dan evaluasi kinerja sepanjang tahun 2025.', '#', 'PDF', '4.2 MB', '#0ea5e9', 1),
        ('Profil CDKWB Batang-Pekalongan', 'Dokumen profil resmi berisi latar belakang, struktur organisasi, wilayah kerja, dan layanan utama CDKWB.', '#', 'PDF', '2.1 MB', '#10b981', 2),
        ('Infografis Program Konservasi 2025', 'Visualisasi data program rehabilitasi mangrove, kawasan konservasi, dan pencapaian ekologis.', '#', 'PNG', '1.8 MB', '#8b5cf6', 3),
        ('Brosur Layanan CDKWB', 'Panduan singkat seluruh layanan yang tersedia: SLO, konsultasi perikanan, pengaduan, dan konservasi.', '#', 'PDF', '0.9 MB', '#f59e0b', 4),
        ('Maklumat Pelayanan Publik', 'Pernyataan resmi komitmen CDKWB dalam memberikan pelayanan publik yang transparan dan akuntabel.', '#', 'PDF', '0.4 MB', '#ef4444', 5),
        ('Leaflet Kawasan Konservasi Karang Jeruk', 'Leaflet edukasi tentang Kawasan Konservasi Karang Jeruk — ekosistem, zonasi, dan aturan kunjungan.', '#', 'PDF', '1.2 MB', '#06b6d4', 6)
      `);
      console.log('✅  Seeded 6 initial documents.');
    } else {
      console.log(`ℹ️   Table already has ${existing[0].cnt} row(s), skipping seed.`);
    }
  } finally {
    conn.release();
    await pool.end();
  }
}

createTable().catch((err) => { console.error(err); process.exit(1); });
