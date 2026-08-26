import mysql from 'mysql2/promise';

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
// Only use SSL if we are connecting to a remote host (not localhost)
const isLocal = !process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

export const pool = global._mysqlPool || mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'diskan',
  port: dbPort,
  ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool;
}
