const mysql = require('mysql2/promise');
async function run() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diskan'
  });
  await conn.query(`
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
    )
  `);
  console.log('Table materi created');
  conn.end();
}
run().catch(console.error);
