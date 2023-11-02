import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';
import { handleGoogleLogin } from './controllers/signin.js';
import apiRouter from './routes/api.js';
const app = express();
const PORT = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.use(express.static(resolve(__dirname, '../client')));

app.post('/auth/google/callback', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (payload) {
      await handleGoogleLogin(payload, res);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user', error: error.toString() });
  }
});
app.use('/api', apiRouter);

// error handler
app.use((req, res) => res.status(404).send('This is not the page you are looking for'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
