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
    console.log("Adding nomor_ponsel and domisili columns to pendaftaran_magang table...");
    await pool.query(`
      ALTER TABLE pendaftaran_magang 
      ADD COLUMN nomor_ponsel VARCHAR(20) NULL,
      ADD COLUMN domisili VARCHAR(255) NULL
    `);
    console.log('Columns added successfully!');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error("Error altering table:", err);
    }
  } finally {
    process.exit(0); 
  }
} 

run();
