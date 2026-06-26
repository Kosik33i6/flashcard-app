import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World from backend!');
});

console.log(process.env.TEST);
console.log('Backend started on http://localhost:3000');
console.log('Hello!');

app.listen(3000);
