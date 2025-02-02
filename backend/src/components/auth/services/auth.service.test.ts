import bcrypt from 'bcryptjs'
import { err } from 'neverthrow'
import { AuthUser } from '../domain/auth-user.entity'
import { Password } from '../domain/password.value-object'
import { AuthService } from './auth.service'

describe('AuthService', () => {
    let authService: AuthService

    beforeEach(() => {
        authService = new AuthService()
        jest.spyOn(bcrypt, 'hashSync').mockImplementation(
            (password) => `hashed-${password}`
        )
        jest.spyOn(bcrypt, 'compareSync').mockImplementation(
            (password, hash) => hash === `hashed-${password}`
        )
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should create a user with a hashed password', () => {
        const result = authService.createUser(
            'test@example.com',
            'Validvalid1!',
            'Test User'
        )
        expect(result.isOk()).toBe(true)
        expect(result._unsafeUnwrap().getDetails.password).toBe(
            'hashed-Validvalid1!'
        )
    })

    test('should fail if password is invalid', () => {
        jest.spyOn(Password, 'create').mockReturnValue(err('Invalid password'))
        const result = authService.createUser(
            'test@example.com',
            'short',
            'Test User'
        )
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Invalid password')
    })

    test('should fail if new password is invalid', () => {
        const user = AuthUser.create({
            id: '123',
            email: 'test@example.com',
            fullName: 'Test User',
            password: 'hashed-OldPass1!',
        })._unsafeUnwrap()
        jest.spyOn(Password, 'create').mockReturnValue(err('Invalid password'))
        const result = authService.changePassword(user, 'short')
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Invalid password')
    })

    test('should verify correct password', () => {
        const result = authService.verifyPassword('Valid1!', 'hashed-Valid1!')
        expect(result.isOk()).toBe(true)
    })

    test('should fail verification if password is incorrect', () => {
        const result = authService.verifyPassword(
            'WrongPass!',
            'hashed-Valid1!'
        )
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Invalid credentials')
    })
})
