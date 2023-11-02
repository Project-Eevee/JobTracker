import { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        // Check if the user already exists
        const result = await client.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
        let user;
        if (result.rows.length > 0) {
          // User exists, return the user
          user = result.rows[0];
        } else {
          // User doesn't exist, insert a new record
          const insertResult = await client.query(
            'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
            [profile.id, profile.emails[0].value, profile.displayName]
          );
          user = insertResult.rows[0];
        }
        // Commit the transaction
        await client.query('COMMIT');
        done(null, user);
      } catch (error) {
        await client.query('ROLLBACK');
        done(error, null);
      } finally {
        client.release();
      }
    }
  )
);
