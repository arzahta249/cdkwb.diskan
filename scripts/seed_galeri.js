const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diskan'
  });
  
  const categories = ['Konservasi', 'Pengawasan', 'Operasional'];
  const tables = ['kategory_foto', 'kategory_video', 'kategory_infografis'];
  
  for (const table of tables) {
    for (const cat of categories) {
      try {
        await pool.query(`INSERT INTO ${table} (name_kategori) VALUES (?)`, [cat]);
        console.log(`Inserted ${cat} into ${table}`);
      } catch(e) {
        // Ignore duplicate errors if not unique, just try to seed
      }
    }
    console.log(`Seeded ${table}`);
  }
  process.exit(0);
}

run().catch(console.error);
