import mongoose from 'mongoose';
import validator from 'validator';

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
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regular Expression (Simple & Common)
    // validate: { // Custom Validator (More Control)
    //   validator: function (value: string) {
    //     // Very basic email regex
    //     return /^\S+@\S+\.\S+$/.test(value);
    //   },
    //   message: 'Please enter a valid email address. got {VALUE}',
    // },

    validate: {
      // 3rd party package to validate email
      validator: (value: string) => validator.isEmail(value),
      message: 'Please enter a valid email address',
    },
  },
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
