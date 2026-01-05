import { err, ok, Result } from 'neverthrow';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(64, 'Password must be no more than 64 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character',
  )
  .refine((val) => !/\s/.test(val), {
    message: 'Password must not contain spaces',
  });

export class Password {
  private constructor(private readonly password: string) {}

  public static create(password: string): Result<Password, string> {
    const result = passwordSchema.safeParse(password);

    if (!result.success) {
      const errors = result.error.issues.map((e) => e.message).join(' ');
      return err(errors);
    }

    return ok(new Password(result.data));
  }

  public get value() {
    return this.password;
  }
}
