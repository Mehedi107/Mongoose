import express, { Request, Response } from 'express';
import User from '../models/user.model';

const userRouter = express.Router();

// ✅ Create user
userRouter.post('/create-user', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ status: true, message: 'User created successfully!' });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
});

export default userRouter;
