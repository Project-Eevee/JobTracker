import { query } from '../models/jobTrackerModels.js';

const handleGoogleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const googleUser = await verifyToken(token);

    const { sub: googleId, email, name } = googleUser;

    let userQueryResult = await query('SELECT * FROM users WHERE google_id = $1', [googleId]);

    if (userQueryResult.rows.length > 0) {
      // User exists, return the user
      res.status(200).json(userQueryResult.rows[0]);
    } else {
      // User doesn't exist, insert a new record
      userQueryResult = await query(
        'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
        [googleId, email, name]
      );
      res.status(201).json(userQueryResult.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export { handleGoogleLogin };
