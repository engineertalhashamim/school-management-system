import pool from './config/db.js';

async function checkConnection() {
  try {
    const result = await pool.query('SELECT NOW() as time');
    console.log('DB Connected!', result.rows[0]);
  } catch (error) {
    console.log('DB Failed:', error.message)
  } finally {
    pool.end();
  }
}

checkConnection();