import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name is required'),

    email: z
      .string()
      .trim()
      .email('Please enter a valid email'),

    password: z
      .string()
      .min(
        8,
        'Password must be at least 8 characters',
      )
      .regex(/[A-Z]/, 'One uppercase letter required')
      .regex(/[a-z]/, 'One lowercase letter required')
      .regex(/[0-9]/, 'One number required'),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    },
  );

export type RegisterFormData = z.infer<
  typeof registerSchema
>;