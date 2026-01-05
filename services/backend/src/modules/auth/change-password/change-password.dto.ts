import { z } from 'zod';

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmNewPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
