import { sign } from 'jsonwebtoken'
import { LoginUserCommand } from '../commands/login-user.command'
import { UserRepository } from '../../domain/user.repository'
import { getEnv } from '../../../../utils/env'
import { AuthService } from '../../services/auth.service'

export class LoginUserHandler {
    private userRepository: UserRepository
    private authService: AuthService

    constructor(userRepository: UserRepository, authService: AuthService) {
        this.userRepository = userRepository
        this.authService = authService
    }

    async execute(command: LoginUserCommand): Promise<string> {
        const user = await this.userRepository.findByEmail(command.email)

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isValid = this.authService.verifyPassword(
            command.password,
            user.password
        )
        if (!isValid) {
            throw new Error('Invalid credentials')
        }

        const token = sign({ userID: user.id }, getEnv('JWT_SECRET'), {
            expiresIn: '1h',
        })

        return token
    }
}
