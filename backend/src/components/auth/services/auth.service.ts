import { User } from '../domain/user.entity'
import { compareSync, hashSync } from 'bcryptjs'
export class AuthService {
    hashPassword(password: string): string {
        return hashSync(password, 10)
    }

    createUser(email: string, password: string, name: string): User {
        return new User(email, password, name)
    }

    verifyPassword(password: string, storedHash: string): boolean {
        return compareSync(password, storedHash)
    }
}
