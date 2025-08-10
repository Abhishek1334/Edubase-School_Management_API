import 'dotenv/config';
import mysql from 'mysql2/promise';

// Railway environment variables
const dbConfig = {
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DB || 'school_management',
};

const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: 10,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Connection config:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });
  }
}

testConnection();

export { pool };
