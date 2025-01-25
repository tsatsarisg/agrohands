import { err, ok, Result } from 'neverthrow'
import { AuthUser } from '../domain/auth-user.entity'
import { compareSync, hashSync } from 'bcryptjs'
import { Password } from '../domain/password.value-object'

export class AuthService {
    private hashPassword(password: Password): string {
        return hashSync(password.getPassword, 10)
    }

    createUser(
        email: string,
        password: string,
        name: string
    ): Result<AuthUser, string> {
        const pass = Password.create(password)

        if (pass.isErr()) return err(pass.error)
        const hashedPassword = this.hashPassword(pass.value)

        return AuthUser.create({
            id: 'new',
            fullName: name,
            email,
            password: hashedPassword,
        })
    }

    changePassword(
        user: AuthUser,
        newPassword: string
    ): Result<AuthUser, string> {
        const password = Password.create(newPassword)

        if (password.isErr()) return err(password.error)
        const hashedPassword = this.hashPassword(password.value)
        user.changePassword(hashedPassword)

        return ok(user)
    }

    verifyPassword(
        password: string,
        storedHash: string
    ): Result<undefined, string> {
        if (compareSync(password, storedHash)) return ok(undefined)
        else return err('Invalid credentials')
    }
}
