import { z } from 'zod';
import {
  userRoleSchema,
  userSchema,
  updateUserSchema,
  updatePasswordSchema,
} from '@/schemas';

export type UserRole = z.infer<typeof userRoleSchema>;

export type UserInterface = z.infer<typeof userSchema>;

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;

export interface UserDocument extends UserInterface {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
