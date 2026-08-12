import { pool } from './lib/db';

async function seed() {
  try {
    const [rows]: any = await pool.query('SELECT * FROM kategory_artikel');
    if (rows.length === 0) {
      await pool.query('INSERT INTO kategory_artikel (name_kategori) VALUES (?)', ['Umum']);
      await pool.query('INSERT INTO kategory_artikel (name_kategori) VALUES (?)', ['Edukasi']);
      await pool.query('INSERT INTO kategory_artikel (name_kategori) VALUES (?)', ['Pengumuman']);
      console.log('Kategori berhasil ditambahkan!');
    } else {
      console.log('Kategori sudah ada:', rows);
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

seed();
