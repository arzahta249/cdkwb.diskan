import { pool } from './lib/db';

async function checkNews() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM berita');
    console.log('Total berita:', rows.length);
    console.log(rows);
  } catch (error) {
    console.error('Error fetching berita:', error);
  } finally {
    process.exit(0);
  }
}

checkNews();
