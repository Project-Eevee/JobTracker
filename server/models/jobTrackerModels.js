import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

// Check the connection immediately after creating the pool
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database:', res.rows[0]);
  }
});

export const query = (text, params) => {
  console.log('executed query', text);
  return pool.query(text, params);
};
