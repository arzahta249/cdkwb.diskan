import mysql from 'mysql2/promise';

async function run() { 
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diskan',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    console.log("Creating pendaftaran_magang table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pendaftaran_magang (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        universitas VARCHAR(255) NOT NULL,
        jurusan VARCHAR(255) NOT NULL,
        posisi VARCHAR(100) NOT NULL,
        motivasi_cv TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table pendaftaran_magang created successfully!');
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    process.exit(0); 
  }
} 

run();
