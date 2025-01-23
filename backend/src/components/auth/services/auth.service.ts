import { Result } from 'neverthrow'
import { AuthUser } from '../domain/auth-user.entity'
import { compareSync, hashSync } from 'bcryptjs'

export class AuthService {
    hashPassword(password: string): string {
        return hashSync(password, 10)
    }

    createUser(
        email: string,
        password: string,
        name: string
    ): Result<AuthUser, string> {
        return AuthUser.create({ id: 'new', fullName: name, email, password })
    }

    verifyPassword(password: string, storedHash: string): boolean {
        return compareSync(password, storedHash)
    }
}
