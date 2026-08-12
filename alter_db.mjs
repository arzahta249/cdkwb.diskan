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
    try {
      await pool.query('ALTER TABLE artikel DROP FOREIGN KEY artikel_ibfk_2;');
    } catch(e) { console.log("Drop FK failed", e.message); }

    try {
      await pool.query('ALTER TABLE artikel DROP COLUMN id_kategori;');
    } catch(e) { console.log("Drop column failed", e.message); }
    
    console.log('DB altered'); 
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0); 
  }
} 
run();
