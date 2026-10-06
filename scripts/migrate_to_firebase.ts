import mysql from 'mysql2/promise';
const admin = require('firebase-admin');
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function migrate() {
  console.log('Connecting to MySQL...');
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 1. Get all tables
    const [tables]: any = await pool.query('SHOW TABLES');
    const tableKey = `Tables_in_${process.env.DB_NAME}`;
    
    for (const row of tables) {
      const tableName = row[tableKey] || Object.values(row)[0];
      console.log(`\nMigrating table: ${tableName}`);
      
      const [rows]: any = await pool.query(`SELECT * FROM ${tableName}`);
      console.log(`Found ${rows.length} records in ${tableName}.`);
      
      let count = 0;
      for (const record of rows) {
        // Try to find a primary key column to use as Document ID
        const idCol = Object.keys(record).find(k => k.toLowerCase() === 'id' || k.toLowerCase() === `id_${tableName}` || k.toLowerCase() === `${tableName}_id`);
        
        let docRef;
        if (idCol && record[idCol] !== undefined) {
          docRef = db.collection(tableName as string).doc(String(record[idCol]));
        } else {
          docRef = db.collection(tableName as string).doc();
        }
        
        // Clean undefined values for Firestore
        const cleanRecord = { ...record };
        for (const k in cleanRecord) {
          if (cleanRecord[k] === undefined) {
            cleanRecord[k] = null;
          }
        }
        
        await docRef.set(cleanRecord);
        count++;
      }
      console.log(`Successfully migrated ${count} records into Firestore collection '${tableName}'.`);
    }
    
    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrate().catch(console.error);
