import { query } from '../models/jobTrackerModels.js';

import 'dotenv';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const handleGoogleLogin = async (payload, res) => {
  try {
    const { sub: googleId, email, name } = payload;
    const password = googleId;
    const username = email;
    const userQueryResult = await query('SELECT * FROM users WHERE username = $1', [username]);
    console.log(userQueryResult);
    const _id = getRandomInt(2147483647);

    if (userQueryResult.rows.length > 0) {
      // User exists, return the user
      res.status(200).json(userQueryResult.rows[0]);
    } else {
      // User doesn't exist, insert a new record and return it
      const insertResult = await query(
        'INSERT INTO users (_id, username, password) VALUES ($1, $2, $3) RETURNING *',
        [_id, username, password]
      );
      res.status(201).json(insertResult.rows[0]);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
export { handleGoogleLogin };
