import mysql from 'mysql2/promise';
async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'diskan' });
  try {
    const [rows] = await pool.query(`SELECT a.ID_artikel, a.Judul, a.Slug, a.value, a.isi_artikel, a.tanggal, a.kategori as name_kategori, u.nama as nama_penulis FROM artikel a LEFT JOIN user u ON a.id_penulis = u.ID_user WHERE a.status = 'published'`);
    console.log('success:', rows.length);
  } catch(e) {
    console.error('SQL_ERROR:', e);
  }
  process.exit(0);
}
run();
