import mongoose from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true, default: 'user' },
});

const User = mongoose.model('User', userSchema);

export default User;
