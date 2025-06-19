import mongoose from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'First name must be 3 character long. got {VALUE}'],
  },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, 'Password length must be at least 8 character'],
  },
  role: { type: String, trim: true, default: 'user' },
});

const User = mongoose.model('User', userSchema);

export default User;
