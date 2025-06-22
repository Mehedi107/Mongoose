import 'dotenv/config';
import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db';
import { bookRouter } from './routes/book.route';
import { borrowRouter } from './routes/borrow.route';

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/', bookRouter);
app.use('/api/borrow', borrowRouter);

// mongodb connection
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Library Management API is running');
});

app.listen(port, () => {
  console.log(`✅ Library app listening on port ${port}`);
});
