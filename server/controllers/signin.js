import { query } from '../models/jobTrackerModels.js';
import bcrypt from 'bcrypt';
import 'dotenv';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const SALT_ROUNDS = 10;

const handleGoogleLogin = async (payload, res) => {
  try {
    const { sub: googleId, email, name } = payload;
    const password = await bcrypt.hash(googleId, SALT_ROUNDS);
    const username = email;
    const userQueryResult = await query('SELECT * FROM users WHERE username = $1', [username]);
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

const manualLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const username = email;

    const userQueryResult = await query('SELECT * FROM users WHERE username = $1', [username]);
    console.log(userQueryResult);
    if (userQueryResult.rows.length > 0) {
      const user = userQueryResult.rows[0];
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (passwordIsValid) {
        return res.status(200).json({
          message: 'Login successful!',
        });
      } else {
        return res.status(401).json({
          message: 'Invalid email or password!',
        });
      }
    } else {
      return res.status(401).json({
        message: 'Invalid email or password!',
      });
    }
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { signup_email, signup_password } = req.body;
    console.log(req.body);
    if (!signup_email || !signup_password) {
      return res.status(400).json({
        message: 'Email and password required!',
      });
    }
    const username = signup_email;
    const hashedPassword = await bcrypt.hash(signup_password, SALT_ROUNDS);

    const userQueryResult = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (userQueryResult.rows.length > 0) {
      throw new Error('Username is taken!');
    } else {
      const _id = getRandomInt(2147483647);
      const newUserQueryResult = await query(
        'INSERT INTO users (_id, username, password) VALUES ($1, $2, $3) RETURNING *',
        [_id, username, hashedPassword]
      );

      const newUser = newUserQueryResult.rows[0];
      const { password, ...userWithoutPassword } = newUser;
      return res.status(201).json({
        message: 'Signup successful!',
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    next(error);
  }
};
export { handleGoogleLogin, manualLogin, signup };
