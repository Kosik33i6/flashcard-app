import { z } from 'zod';
import { ROLE } from '@/constants';

export const userRoleSchema = z
  .enum([ROLE.ADMIN, ROLE.USER])
  .default(ROLE.USER);

export const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email().min(5).max(50),
  password: z.string().min(8).max(50),
  role: userRoleSchema.default('user'),
});

export const updateUserSchema = userSchema.pick({
  name: true,
  email: true,
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(8).max(50),
  newPassword: z.string().min(8).max(50),
});
