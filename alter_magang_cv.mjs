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
    console.log("Adding cv_file column to pendaftaran_magang table...");
    await pool.query(`
      ALTER TABLE pendaftaran_magang 
      ADD COLUMN cv_file VARCHAR(255) NULL
    `);
    console.log('Column cv_file added successfully!');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column cv_file already exists.');
    } else {
      console.error("Error altering table:", err);
    }
  } finally {
    process.exit(0); 
  }
} 

run();
