import { err, ok, Result } from 'neverthrow'
import {
    AuthUserReadRepository,
    AuthUserWriteRepository,
} from '../../domain/auth-user.repository'
import { AuthService } from '../../services/auth.service'
import { SignupUserCommand } from '../commands/signup-user.command'

export class SignupUserHandler {
    constructor(
        private userReadRepository: AuthUserReadRepository,
        private userWriteRepository: AuthUserWriteRepository,
        private authService: AuthService
    ) {}

    async execute(
        command: SignupUserCommand
    ): Promise<Result<{ id: string }, string>> {
        const userResult = await this.userReadRepository.findByEmail(
            command.email
        )
        if (userResult.isOk()) return err('User already exists')

        const userToBeSaved = this.authService.createUser(
            command.email,
            command.password,
            command.name
        )

        if (userToBeSaved.isErr()) return err(userToBeSaved.error)

        const newUser = await this.userWriteRepository.save(userToBeSaved.value)
        if (newUser.isErr()) return err(newUser.error)

        return ok({ id: newUser.value.id })
    }
}
