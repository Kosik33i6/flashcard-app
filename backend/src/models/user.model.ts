import { Schema, model } from 'mongoose';
import { User } from '@/@types';

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [3, 'Name must be at least 3 characters long'],
      maxLength: [20, 'Name must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      minLength: [5, 'Email must be at least 5 characters long'],
      maxLength: [50, 'Email must be at most 50 characters long'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minLength: 7,
      maxLength: 50,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', UserSchema);
