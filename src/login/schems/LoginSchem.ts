import { z } from 'zod';

export const LoginSchem = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type Login = z.infer<typeof LoginSchem>;

export const loginDefaultValues: Login = {
  username: '',
  password: '',
};
