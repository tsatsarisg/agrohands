import { Injectable, Inject } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createCipheriv,
  createDecipheriv,
  createHash,
} from 'crypto';
import { User } from '@modules/user';
import { Password } from '../domain/password.value-object';
import { CONFIG_TOKEN } from '../../../../config/config.factory';
import type { Config } from '../../../../config/config.schema';

@Injectable()
export class AuthService {
  private readonly SCRYPT_PARAMS = {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 32 * 1024 * 1024,
  };
  private readonly KEY_LENGTH = 64;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private readonly encryptionKey: Buffer;
  private readonly config: Config;

  constructor(@Inject(CONFIG_TOKEN) config: Config) {
    this.config = config;
    this.encryptionKey = createHash('sha256')
      .update(config.ENCRYPTION_KEY)
      .digest();
  }

  private hashPassword(password: Password): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(
      password.value,
      salt,
      this.KEY_LENGTH,
      this.SCRYPT_PARAMS,
    );
    return `${salt}:${hash.toString('hex')}`;
  }

  private encryptHash(hashedPassword: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv(
      this.ENCRYPTION_ALGORITHM,
      this.encryptionKey,
      iv,
    );

    let encrypted = cipher.update(hashedPassword, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  private decryptHash(encryptedPassword: string): Result<string, string> {
    try {
      const [ivHex, authTagHex, encrypted] = encryptedPassword.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');

      const decipher = createDecipheriv(
        this.ENCRYPTION_ALGORITHM,
        this.encryptionKey,
        iv,
      );
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return ok(decrypted);
    } catch {
      return err('Failed to decrypt password');
    }
  }

  createUserWithPassword(
    email: string,
    password: string,
    name: string,
  ): Result<User, string> {
    const pass = Password.create(password);

    if (pass.isErr()) return err(pass.error);
    const hashedPassword = this.hashPassword(pass.value);
    const encryptedPassword = this.encryptHash(hashedPassword);

    return User.create({
      id: 'new',
      fullName: name,
      email,
      password: encryptedPassword,
    });
  }

  hashAndEncryptPassword(user: User, newPassword: string): Result<User, string> {
    const password = Password.create(newPassword);

    if (password.isErr()) return err(password.error);
    const hashedPassword = this.hashPassword(password.value);
    const encryptedPassword = this.encryptHash(hashedPassword);
    user.changePassword(encryptedPassword);

    return ok(user);
  }

  verifyPassword(
    password: string,
    encryptedStoredHash: string,
  ): Result<undefined, string> {
    const decryptResult = this.decryptHash(encryptedStoredHash);
    if (decryptResult.isErr()) return err('Invalid credentials');

    const storedHash = decryptResult.value;

    try {
      const [salt, hash] = storedHash.split(':');
      const hashBuffer = Buffer.from(hash, 'hex');
      const suppliedHashBuffer = scryptSync(
        password,
        salt,
        this.KEY_LENGTH,
        this.SCRYPT_PARAMS,
      );

      if (timingSafeEqual(hashBuffer, suppliedHashBuffer)) {
        return ok(undefined);
      }
      return err('Invalid credentials');
    } catch {
      return err('Invalid credentials');
    }
  }
}
