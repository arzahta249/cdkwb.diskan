const mysql = require('mysql2/promise');

async function alterTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'diskan',
  });

  try {
    // Check if column exists, if not, add it
    const [columns] = await connection.query('SHOW COLUMNS FROM berita LIKE "image"');
    if (columns.length === 0) {
      await connection.query('ALTER TABLE berita ADD COLUMN image VARCHAR(255) AFTER isi_berita');
      console.log('Column "image" added successfully.');
    } else {
      console.log('Column "image" already exists.');
    }
  } catch (err) {
    console.error('Error altering table:', err);
  } finally {
    await connection.end();
  }
}

alterTable();
