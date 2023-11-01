import { resolve } from 'path';
import express from 'express';
const app = express();
import cors from 'cors';

const PORT = 3000;

app.use(express.json());
app.use(express.urlenconded({ extended: true }));
app.use(cors());

app.use(express.static(resolve(__dirname, '../client')));

// error handler
app.use((req, res) => res.status(404).send('This is not the page you are looking for'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkonwn middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server lisetning on port: ${PORT}`);
});

export default app;
