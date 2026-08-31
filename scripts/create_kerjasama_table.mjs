import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'diskan',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createKerjasamaTable() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
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
    console.log('✅  Table kerjasama created.');

    const [existing] = await conn.query('SELECT COUNT(*) as cnt FROM kerjasama');
    if (existing[0].cnt === 0) {
      const initialPartners = [
        {
          nama_mitra: 'Fakultas Perikanan dan Ilmu Kelautan, Universitas Pancasakti Tegal (UPS)',
          singkatan: 'FPIK UPS Tegal',
          kategori: 'akademik',
          nomor_pks_mitra: '444/K/L-5/FPIK-UPS/XII/2024',
          nomor_pks_dinas: '019.5/8689/XII/2024',
          tanggal_pks: '15 Des 2024',
          jangka_waktu: '4 Tahun (2024 — 2028)',
          status: 'aktif',
          level: 'Provinsi Jawa Tengah',
          penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPIK UPS',
          ringkasan: 'Program Pengembangan Sumberdaya Kelautan dan Perikanan serta penguatan Tri Dharma Perguruan Tinggi di kawasan Pantura.',
          ruang_lingkup: JSON.stringify([
            'Peningkatan mutu dan pengembangan SDM kelautan & perikanan',
            'Penyelenggaraan riset terapan & pengabdian masyarakat pesisir',
            'Pertukaran data dan publikasi ilmiah kemaritiman',
            'Pemanfaatan bersama sarana-prasarana laboratorium & lapangan'
          ]),
          prodi_terlibat: '',
          keluaran_program: '',
          pendanaan: '',
          file_dokumen_url: '',
          urutan: 1
        },
        {
          nama_mitra: 'Fakultas Perikanan, Universitas Pekalongan (UNIKAL)',
          singkatan: 'Fakultas Perikanan UNIKAL',
          kategori: 'akademik',
          nomor_pks_mitra: '0289/C.06.02/FPr/XII/2024',
          nomor_pks_dinas: '019.5/8688/XII/2024',
          tanggal_pks: '15 Des 2024',
          jangka_waktu: '4 Tahun (2024 — 2028)',
          status: 'aktif',
          level: 'Provinsi Jawa Tengah',
          penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FPr UNIKAL',
          ringkasan: 'Sinergi riset budidaya perikanan, kajian mitigasi abrasi pesisir Pekalongan-Batang, dan program magang mahasiswa.',
          ruang_lingkup: JSON.stringify([
            'Penelitian terapan teknologi budidaya dan kelautan',
            'Program magang mandiri dan MBKM di wilayah kerja CDKWB',
            'Pertukaran data saintifik perikanan berkelanjutan',
            'Pemberdayaan kelompok pembudidaya ikan dan nelayan lokal'
          ]),
          prodi_terlibat: '',
          keluaran_program: '',
          pendanaan: '',
          file_dokumen_url: '',
          urutan: 2
        },
        {
          nama_mitra: 'Fakultas Sains & Teknologi Pertanian, Universitas Muhammadiyah Semarang (UNIMUS)',
          singkatan: 'FSTP UNIMUS',
          kategori: 'akademik',
          nomor_pks_mitra: '120/UNIMUS/AD/DN/2024',
          nomor_pks_dinas: '019.5/8690/XII/2024',
          tanggal_pks: '15 Des 2024',
          jangka_waktu: '4 Tahun (2024 — 2028)',
          status: 'aktif',
          level: 'Provinsi Jawa Tengah',
          penandatangan: 'Ir. Fendiawan Tiskiantoro, M.Si (Kepala DKP Jateng) & Dekan FSTP UNIMUS',
          ringkasan: 'Kolaborasi lintas 4 Program Studi (Ilmu Kelautan, Teknologi Pangan, Sains Data, Statistik) untuk riset dan hilirisasi perikanan.',
          ruang_lingkup: JSON.stringify([
            'Kemitraan Tri Dharma lintas 4 disiplin ilmu strategis',
            'Pengolahan & hilirisasi produk pangan hasil perikanan',
            'Analisis statistik data produksi dan pemodelan sains data',
            'Eksplorasi ekologi kelautan dan pembinaan nelayan'
          ]),
          prodi_terlibat: 'S1 Ilmu Kelautan, S1 Teknologi Pangan, S1 Sains Data, S1 Statistik',
          keluaran_program: '',
          pendanaan: '',
          file_dokumen_url: '',
          urutan: 3
        },
        {
          nama_mitra: 'Yayasan Rekam Jejak Alam Nusantara (Rekam Nusantara Foundation)',
          singkatan: 'Rekam Nusantara Foundation',
          kategori: 'teknis',
          nomor_pks_mitra: '06/SPK/YRJAN/XI/2022',
          nomor_pks_dinas: '019.5/910/I/2023',
          tanggal_pks: '23 Nov 2022',
          jangka_waktu: 's.d. 1 Des 2024 (Dapat Diperpanjang)',
          status: 'perpanjangan',
          level: 'Provinsi Jawa Tengah',
          penandatangan: 'Kepala DKP Jateng & Direktur Eksekutif Yayasan Rekam Jejak Alam Nusantara',
          ringkasan: 'Pengelolaan perikanan demersal berkelanjutan (rajungan & kepiting), pendekatan Blue Carbon kawasan konservasi pesisir, dan monitoring ekologi.',
          ruang_lingkup: JSON.stringify([
            'Pengelolaan perikanan demersal (rajungan Laut Jawa & kepiting Samudera Hindia)',
            'Kawasan konservasi perairan daerah berbasis Blue Carbon',
            'Monitoring biofisik terumbu karang dan rehabilitasi mangrove',
            'Rekomendasi kebijakan tata kelola perikanan ramah lingkungan'
          ]),
          prodi_terlibat: '',
          keluaran_program: JSON.stringify([
            'Pengelolaan Perikanan Berkelanjutan Rajungan (Laut Jawa)',
            'Pengelolaan Perikanan Kepiting (Samudera Hindia Selatan Jawa)',
            'Kajian Potensi Cadangan Karbon Biru (Blue Carbon) Pesisir',
            'Monitoring Biofisik Karang Jeruk & Ujungnegoro'
          ]),
          pendanaan: 'Hibah Program: ± Rp 200.000.000 / Tahun',
          file_dokumen_url: '',
          urutan: 4
        },
        {
          nama_mitra: 'Pokmaswas "Agung Jaya", Desa Munjungagung, Kec. Kramat, Kab. Tegal',
          singkatan: 'Pokmaswas Agung Jaya',
          kategori: 'pokmaswas',
          nomor_pks_mitra: 'SK Kades No. 141/08/X/2016',
          nomor_pks_dinas: '',
          tanggal_pks: '31 Okt 2016',
          jangka_waktu: 'SK Pembentukan Desa (Aktif Berjalan)',
          status: 'tetap',
          level: 'Desa / Wilayah Kab. Tegal',
          penandatangan: 'Kepala Desa Munjungagung (Mitra CDKWB & Penyuluh Kab. Tegal)',
          ringkasan: 'Kelompok pengawas masyarakat pesisir (13 anggota) yang melaksanakan pengawasan partisipatif sumber daya kelautan dan konservasi mangrove.',
          ruang_lingkup: JSON.stringify([
            'Pengawasan swadaya terhadap praktek penangkapan ikan merusak',
            'Pelaporan dini pencemaran dan pelanggaran zonasi pesisir',
            'Edukasi kelestarian ekosistem laut kepada nelayan lokal',
            'Pendampingan kegiatan konservasi mangrove pesisir Kramat'
          ]),
          prodi_terlibat: '',
          keluaran_program: 'Ketua: Ranito · Jumlah Anggota: 13 Orang · Lokasi: Desa Munjungagung, Kec. Kramat, Kab. Tegal',
          pendanaan: '',
          file_dokumen_url: '',
          urutan: 5
        }
      ];

      for (const p of initialPartners) {
        await conn.query(`
          INSERT INTO kerjasama (
            nama_mitra, singkatan, kategori, nomor_pks_mitra, nomor_pks_dinas,
            tanggal_pks, jangka_waktu, status, level, penandatangan,
            ringkasan, ruang_lingkup, prodi_terlibat, keluaran_program,
            pendanaan, file_dokumen_url, urutan
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          p.nama_mitra, p.singkatan, p.kategori, p.nomor_pks_mitra, p.nomor_pks_dinas,
          p.tanggal_pks, p.jangka_waktu, p.status, p.level, p.penandatangan,
          p.ringkasan, p.ruang_lingkup, p.prodi_terlibat, p.keluaran_program,
          p.pendanaan, p.file_dokumen_url, p.urutan
        ]);
      }
      console.log('✅  Seeded 5 initial partnerships into kerjasama table.');
    } else {
      console.log(`ℹ️   Table kerjasama already has ${existing[0].cnt} records.`);
    }
  } catch (err) {
    console.error('Error creating kerjasama table:', err);
  } finally {
    conn.release();
    await pool.end();
  }
}

createKerjasamaTable().catch(console.error);
