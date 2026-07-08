import { Document } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
