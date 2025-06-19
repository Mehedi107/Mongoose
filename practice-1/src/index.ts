import express from 'express';
import mongoose from 'mongoose';
import noteRoute from './routes/note.routes';
import userRouter from './routes/user.routes';

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use('/', noteRoute);
app.use('/user', userRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongooseNoteDB');
    console.log('✅ MongoDB connected');

    app.get('/', (_req, res) => {
      res.send('Server is running...');
    });

    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

start();
