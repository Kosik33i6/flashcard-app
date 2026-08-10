import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { UserDocument } from '@/@types';
import { userSchema } from '@/schemas';

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 3 characters long'],
      maxLength: [50, 'Name must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      minLength: [5, 'Email must be at least 5 characters long'],
      maxLength: [50, 'Email must be at most 50 characters long'],
      validate: {
        validator: (value: string) =>
          userSchema.shape.email.safeParse(value).success,
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minLength: 8,
      maxLength: 50,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await compare(candidatePassword, this.password);
};

export const User = model<UserDocument>('User', UserSchema);
