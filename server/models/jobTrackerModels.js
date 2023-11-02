import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

export function query(text, params, callback) {
  console.log('executed query', text);
  return pool.query(text, params, callback);
}
