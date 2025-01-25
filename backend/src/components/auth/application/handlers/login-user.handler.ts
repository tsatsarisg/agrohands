import { sign } from 'jsonwebtoken'
import { LoginUserCommand } from '../commands/login-user.command'
import { AuthUserReadRepository } from '../../domain/auth-user.repository'
import { getEnv } from '../../../../utils/env'
import { AuthService } from '../../services/auth.service'
import { err, ok, Result } from 'neverthrow'

export class LoginUserHandler {
    constructor(
        private userReadRepository: AuthUserReadRepository,
        private authService: AuthService
    ) {}

    async execute(
        command: LoginUserCommand
    ): Promise<Result<{ token: string }, string>> {
        const userResult = await this.userReadRepository.findByEmail(
            command.email
        )
        if (userResult.isErr()) return err(userResult.error)
        const user = userResult.value

        const passwordResult = this.authService.verifyPassword(
            command.password,
            user.getDetails.password
        )

        if (passwordResult.isErr()) return err(passwordResult.error)

        const token = sign(
            { userID: user.getDetails.id },
            getEnv('JWT_SECRET'),
            {
                expiresIn: '1h',
            }
        )

        return ok({ token })
    }
}
