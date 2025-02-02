import { Password } from './password.value-object'
describe('Password', () => {
    test('should create a valid password', () => {
        const result = Password.create('Validvalid1!')
        expect(result.isOk()).toBe(true)
    })

    test('should fail if password is too short', () => {
        const result = Password.create('Short1!')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must be at least 8 characters long.'
        )
    })

    test('should fail if password is too long', () => {
        const longPassword = 'A'.repeat(65) + '1!'
        const result = Password.create(longPassword)
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must be no more than 64 characters long.'
        )
    })

    test('should fail if password has no uppercase letter', () => {
        const result = Password.create('lowercase1!')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must contain at least one uppercase letter.'
        )
    })

    test('should fail if password has no lowercase letter', () => {
        const result = Password.create('UPPERCASE1!')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must contain at least one lowercase letter.'
        )
    })

    test('should fail if password has no number', () => {
        const result = Password.create('NoNumber!')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must contain at least one number.'
        )
    })

    test('should fail if password has no special character', () => {
        const result = Password.create('NoSpecial1')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must contain at least one special character.'
        )
    })

    test('should fail if password contains spaces', () => {
        const result = Password.create('Invalid 1!')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toContain(
            'Password must not contain spaces.'
        )
    })
})
