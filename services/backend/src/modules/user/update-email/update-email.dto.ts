import { z } from 'zod';

export const updateEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type UpdateEmailDto = z.infer<typeof updateEmailSchema>;
