export class User {
    constructor(
        public id: string,
        public fullName: string,
        public email: string
    ) {
        this.validate()
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    validate(): void {
        if (!this.email) {
            throw new Error('All fields are required')
        }
        if (!User.validateEmail(this.email)) {
            throw new Error('Invalid email format')
        }
    }
}
