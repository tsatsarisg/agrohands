import { Request, Response } from 'express'
import { err, ok } from 'neverthrow'
import { ChangeUserPasswordHandler } from '../../components/auth/application/handlers/change-password.handler'
import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import {
    AuthUserReadRepository,
    AuthUserWriteRepository,
} from '../../components/auth/domain/auth-user.repository'
import { AuthService } from '../../components/auth/services/auth.service'
import { AuthController } from './auth.controller'
import { SignupUserCommand } from '../../components/auth'

const mockRequest = (body: any, userID?: string): Request =>
    ({
        body,
        userID,
    } as unknown as Request)

const mockResponse = () => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('AuthController', () => {
    let authController: AuthController
    let userReadRepository: AuthUserReadRepository
    let userWriteRepository: AuthUserWriteRepository
    let authService: jest.Mocked<AuthService>
    let mockChangePasswordHandler: ChangeUserPasswordHandler
    let mockSignUpHandler: SignupUserHandler
    let mockLoginHandler: LoginUserHandler

    beforeEach(() => {
        userReadRepository = {
            findByEmail: jest.fn(),
            findByID: jest.fn(),
        }
        userWriteRepository = {
            save: jest.fn(),
            changePassword: jest.fn(),
        }
        authService = {
            createUser: jest.fn(),
            changePassword: jest.fn(),
            verifyPassword: jest.fn(),
        } as unknown as jest.Mocked<AuthService>
        mockChangePasswordHandler = new ChangeUserPasswordHandler(
            userReadRepository,
            userWriteRepository,
            authService
        )
        mockSignUpHandler = new SignupUserHandler(
            userReadRepository,
            userWriteRepository,
            authService
        )
        mockLoginHandler = new LoginUserHandler(userReadRepository, authService)
        authController = new AuthController(
            mockSignUpHandler,
            mockLoginHandler,
            mockChangePasswordHandler
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Signup', () => {
        it('should return 200 and user id on successful signup', async () => {
            mockSignUpHandler.execute = jest
                .fn()
                .mockResolvedValue(ok({ id: 'user123' }))

            const req = mockRequest({
                fullName: 'John Doe',
                email: 'johndoe@example.com',
                password: 'Password123!',
            })
            const res = mockResponse()

            await authController.signup(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ id: 'user123' })
            expect(mockSignUpHandler.execute).toHaveBeenCalledWith(
                expect.any(SignupUserCommand)
            )
        })

        it('should return 400 and error message on failed signup', async () => {
            mockSignUpHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Email already exists'))

            const req = mockRequest({
                fullName: 'John Doe',
                email: 'johndoe@example.com',
                password: 'Password123!',
            })
            const res = mockResponse()

            await authController.signup(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Email already exists',
            })
        })
    })

    describe('Login', () => {
        it('should return 200 and token on successful login', async () => {
            mockLoginHandler.execute = jest
                .fn()
                .mockResolvedValue(ok({ token: 'valid-jwt-token' }))

            const req = mockRequest({
                email: 'johndoe@example.com',
                password: 'Password123!',
            })
            const res = mockResponse()

            await authController.login(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ token: 'valid-jwt-token' })
        })

        it('should return 400 and error message on failed login', async () => {
            mockLoginHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Invalid credentials'))

            const req = mockRequest({
                email: 'johndoe@example.com',
                password: 'wrongpassword',
            })
            const res = mockResponse()

            await authController.login(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid credentials',
            })
        })
    })

    describe('Change Password', () => {
        it('should return 200 on successful password change', async () => {
            mockChangePasswordHandler.execute = jest
                .fn()
                .mockResolvedValue(ok(undefined))

            const req = mockRequest(
                {
                    currentPassword: 'OldPassword123!',
                    newPassword: 'NewPassword123!',
                    confirmNewPassword: 'NewPassword123!',
                },
                'test-user-id'
            )
            const res = mockResponse()

            await authController.changePassword(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                message: 'Password saved successfully',
            })
        })

        it('should return 400 and error message on failed password change', async () => {
            mockChangePasswordHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Current password is incorrect'))

            const req = mockRequest(
                {
                    currentPassword: 'WrongPassword123!',
                    newPassword: 'NewPassword123!',
                    confirmNewPassword: 'NewPassword123!',
                },
                'test-user-id'
            )
            const res = mockResponse()

            await authController.changePassword(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Current password is incorrect',
            })
        })
    })
})
