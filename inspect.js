const mysql = require('mysql2/promise');

async function alterTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'diskan',
  });

  try {
    const [colsImage] = await connection.query('SHOW COLUMNS FROM berita LIKE "image"');
    if (colsImage.length === 0) {
      await connection.query('ALTER TABLE berita ADD COLUMN image VARCHAR(255) AFTER isi_berita');
      console.log('Column "image" added.');
    }

    const [colsType] = await connection.query('SHOW COLUMNS FROM berita LIKE "type"');
    if (colsType.length === 0) {
      await connection.query('ALTER TABLE berita ADD COLUMN type VARCHAR(50) DEFAULT "berita"');
      console.log('Column "type" added.');
    }

    const [colsPenulis] = await connection.query('SHOW COLUMNS FROM berita LIKE "penulis"');
    if (colsPenulis.length === 0) {
      await connection.query('ALTER TABLE berita ADD COLUMN penulis VARCHAR(150) DEFAULT "Admin"');
      console.log('Column "penulis" added.');
    }

    const [colsViews] = await connection.query('SHOW COLUMNS FROM berita LIKE "views"');
    if (colsViews.length === 0) {
      await connection.query('ALTER TABLE berita ADD COLUMN views INT DEFAULT 0');
      console.log('Column "views" added.');
    }
  } catch (err) {
    console.error('Error altering table:', err);
  } finally {
    await connection.end();
  }
}

alterTable();

