import { pool } from './lib/db'; 
async function run() { 
  try {
    await pool.query('ALTER TABLE artikel DROP COLUMN id_kategori;');
    await pool.query('ALTER TABLE artikel ADD COLUMN kategori VARCHAR(255) DEFAULT "Umum";'); 
    console.log('DB altered'); 
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0); 
  }
} 
run();
