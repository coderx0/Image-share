import { z } from 'zod';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const usernameMinLength = 3;
const usernameMaxLength = 20;
const passwordMinLength = 8;

export const RegisterValidator = z.object({
  email: z.string().refine((email) => emailRegex.test(email), {
    message: 'Invalid email format',
  }),
  username: z.string().min(usernameMinLength, {
    message: `Username must be at least ${usernameMinLength} characters`,
  }).max(usernameMaxLength, {
    message: `Username can be at most ${usernameMaxLength} characters`,
  }),
  password: z.string().min(passwordMinLength, {
    message: `Password must be at least ${passwordMinLength} characters`,
  }),
});

export type RegisterRequest = z.infer<typeof RegisterValidator>;
