const mysql = require('mysql2/promise');

async function checkUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'diskan',
  });

  try {
    const [rows] = await connection.query('SELECT * FROM user LIMIT 1');
    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

checkUser();
