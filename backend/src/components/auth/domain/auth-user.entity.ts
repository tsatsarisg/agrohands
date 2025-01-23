import { err, ok, Result } from 'neverthrow'

export type AuthUserProps = {
    id: string
    email: string
    fullName: string
    password: string
}

export class AuthUser {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    private constructor(
        private readonly id: string,
        private email: string,
        private readonly fullName: string,
        private password: string
    ) {}

    public static create(props: AuthUserProps): Result<AuthUser, string> {
        const emailValidation = AuthUser.validateEmail(props.email)
        if (!emailValidation) return err('Not a valid email')

        const passwordValidation = AuthUser.validatePassword(props.password)
        if (!passwordValidation) return err('Not a valid password')

        return ok(
            new AuthUser(props.id, props.email, props.fullName, props.password)
        )
    }

    public changePassword(newPassword: string): Result<void, string> {
        if (!AuthUser.validatePassword(newPassword)) {
            return err('Invalid password format')
        }

        this.password = newPassword
        return ok(undefined)
    }

    static validatePassword(password: string): boolean {
        return password.length >= 8
    }

    private static validateEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email)
    }

    get getDetails() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.fullName,
            password: this.password,
        }
    }
}
