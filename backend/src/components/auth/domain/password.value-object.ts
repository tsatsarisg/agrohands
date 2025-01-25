import { err, ok, Result } from "neverthrow";

export class Password {

    private constructor(
        private readonly password: string    
    ) {}

    public static create(password: string): Result<Password, string> {
      const errors: string[] = [];
  
      if (password.length < 8) errors.push("Password must be at least 8 characters long.");
      if (password.length > 64) errors.push("Password must be no more than 64 characters long.");
      if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
      if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
      if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special character.");
      if (/\s/.test(password)) errors.push("Password must not contain spaces.");
  
      if (errors.length > 0) {
        return err(errors.join(" "));
      }
  
      return ok(new Password(password));
    }

    public get getPassword() {
      return this.password
    }
  }
  