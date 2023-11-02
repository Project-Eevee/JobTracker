import { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from ('../models/jobTrackerModels')
import 'dotenv/config';

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});


use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);

        if (existingUser.rows.length > 0) {
          // User exists, return the user
          done(null, existingUser.rows[0]);
        } else {
          // User doesn't exist, insert a new record
          const newUser = await db.query(
            'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
            [profile.id, profile.emails[0].value, profile.displayName]
          );
          done(null, newUser.rows[0]);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);