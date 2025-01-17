export class User {
    constructor(
        public id: string,
        public fullName: string,
        public email: string,
        public password: string
    ) {
        this.validate()
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    static validatePassword(password: string): boolean {
        return password.length >= 8
    }

    validate(): void {
        if (!this.email || !this.password) {
            throw new Error('All fields are required')
        }
        if (!User.validateEmail(this.email)) {
            throw new Error('Invalid email format')
        }
        if (!User.validatePassword(this.password)) {
            throw new Error(
                'Password must be at least 8 characters long, contain at least one uppercase letter, and one number'
            )
        }
    }
}
