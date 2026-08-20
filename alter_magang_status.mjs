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
    console.log("Adding status column to pendaftaran_magang table...");
    await pool.query(`
      ALTER TABLE pendaftaran_magang 
      ADD COLUMN status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending'
    `);
    console.log('Column status added successfully!');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column status already exists.');
    } else {
      console.error("Error altering table:", err);
    }
  } finally {
    process.exit(0); 
  }
} 

run();
