import { AuthUser } from './auth-user.entity'

describe('AuthUser', () => {
    test('should create a valid user', () => {
        const result = AuthUser.create({
            id: '123',
            email: 'test@example.com',
            fullName: 'Test User',
            password: 'Valid1!',
        })
        expect(result.isOk()).toBe(true)
    })

    test('should fail with an invalid email', () => {
        const result = AuthUser.create({
            id: '123',
            email: 'invalid-email',
            fullName: 'Test User',
            password: 'Valid1!',
        })
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Not a valid email')
    })

    test('should change the password successfully', () => {
        const userResult = AuthUser.create({
            id: '123',
            email: 'test@example.com',
            fullName: 'Test User',
            password: 'OldPass1!',
        })
        expect(userResult.isOk()).toBe(true)

        const user = userResult._unsafeUnwrap()
        const passwordChangeResult = user.changePassword('NewPass1!')
        expect(passwordChangeResult.isOk()).toBe(true)
        expect(user.getDetails.password).toBe('NewPass1!')
    })
})
