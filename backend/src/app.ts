import express from 'express';
import { connectDB } from '@/db/connect';
import { Request, Response } from 'express';
import { PORT, MONGO_URI } from '@/constants';

const app = express();

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
});

const start = () => {
  if (!MONGO_URI) {
    throw new Error(
      'An error occurred while validating the MongoDB URI. Please check your environment variables',
    );
  }

  connectDB(MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

start();
