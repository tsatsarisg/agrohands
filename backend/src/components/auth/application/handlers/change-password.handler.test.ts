import { err, ok } from 'neverthrow'
import {
    AuthUserReadRepository,
    AuthUserWriteRepository,
} from '../../domain/auth-user.repository'
import { AuthService } from '../../services/auth.service'
import { changePasswordCommand } from '../commands/change-password.command'
import { ChangeUserPasswordHandler } from './change-password.handler'

describe('ChangeUserPasswordHandler', () => {
    let userReadRepository: AuthUserReadRepository
    let userWriteRepository: AuthUserWriteRepository
    let authService: AuthService
    let handler: ChangeUserPasswordHandler

    beforeEach(() => {
        userReadRepository = {
            findByID: jest.fn(),
        } as unknown as AuthUserReadRepository
        userWriteRepository = {
            changePassword: jest.fn(),
        } as unknown as AuthUserWriteRepository
        authService = {
            verifyPassword: jest.fn(),
            changePassword: jest.fn(),
        } as unknown as AuthService
        handler = new ChangeUserPasswordHandler(
            userReadRepository,
            userWriteRepository,
            authService
        )
    })

    test('should fail if new passwords do not match', async () => {
        const command: changePasswordCommand = {
            userID: '123',
            oldPassword: 'OldPass1!',
            newPassword: 'NewPass1!',
            confirmNewPassword: 'DifferentPass1!',
        }
        const result = await handler.execute(command)
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Incorrect new passwords')
    })

    test('should fail if user is not found', async () => {
        ;(userReadRepository.findByID as jest.Mock).mockResolvedValueOnce(
            err('User not found')
        )

        const command: changePasswordCommand = {
            userID: '123',
            oldPassword: 'OldPass1!',
            newPassword: 'NewPass1!',
            confirmNewPassword: 'NewPass1!',
        }
        const result = await handler.execute(command)
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('User not found')
    })

    test('should fail if old password is incorrect', async () => {
        const user = { getDetails: { password: 'OldPassss1!' } }

        ;(userReadRepository.findByID as jest.Mock).mockResolvedValueOnce(
            ok(user)
        )
        ;(authService.verifyPassword as jest.Mock).mockReturnValue(
            err('Invalid credentials')
        )

        const command: changePasswordCommand = {
            userID: '123',
            oldPassword: 'WrongPass1!',
            newPassword: 'NewPass1!',
            confirmNewPassword: 'NewPass1!',
        }
        const result = await handler.execute(command)
        expect(result.isErr()).toBe(true)
        expect(result._unsafeUnwrapErr()).toBe('Invalid credentials')
    })

    test('should successfully change password', async () => {
        const user = { getDetails: { password: 'OldPassss1!' } }

        ;(userReadRepository.findByID as jest.Mock).mockResolvedValue(ok(user))
        ;(authService.verifyPassword as jest.Mock).mockReturnValue(
            ok(undefined)
        )
        ;(authService.changePassword as jest.Mock).mockReturnValue(ok(user))
        ;(userWriteRepository.changePassword as jest.Mock).mockResolvedValue(
            ok(undefined)
        )

        const command: changePasswordCommand = {
            userID: '123',
            oldPassword: 'OldPass1!',
            newPassword: 'NewPass1!',
            confirmNewPassword: 'NewPass1!',
        }
        const result = await handler.execute(command)
        expect(result.isOk()).toBe(true)
    })
})
