import { err, ok, Result } from 'neverthrow'

export type UserProps = {
    id: string
    email: string
    fullName: string
}

export class User {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    private constructor(
        private readonly id: string,
        private email: string,
        private readonly fullName: string
    ) {}

    public static create(props: UserProps): Result<User, string> {
        const emailValidation = User.validateEmail(props.email)

        if (!emailValidation) {
            return err('Not a valid email')
        }

        return ok(new User(props.id, props.email, props.fullName))
    }

    private static validateEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email)
    }

    public changeEmail(newEmail: string): Result<void, string> {
        if (!User.validateEmail(newEmail)) {
            return err('Invalid email format')
        }

        this.email = newEmail
        return ok(undefined)
    }

    get getDetails() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.fullName,
        }
    }
}
