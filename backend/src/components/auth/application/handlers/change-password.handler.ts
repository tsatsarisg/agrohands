import { err, ok, Result } from 'neverthrow'
import { UpdateUserEmailCommand } from '../../../user/application/commands/update-email.command'
import {
    AuthUserReadRepository,
    AuthUserWriteRepository,
} from '../../domain/auth-user.repository'
import { changePasswordCommand } from '../commands/change-password.command'
import { AuthService } from '../../services/auth.service'

export class ChangeUserPasswordHandler {
    constructor(
        private readonly userReadRepository: AuthUserReadRepository,
        private readonly userWriteRepository: AuthUserWriteRepository,
        private authService: AuthService
    ) {}

    async execute(
        command: changePasswordCommand
    ): Promise<Result<void, string>> {
        if (command.newPassword !== command.confirmNewPassword)
            return err('Incorrect new passwords')

        const userResult = await this.userReadRepository.findByID(
            command.userID
        )
        if (userResult.isErr()) return err(userResult.error)
        const user = userResult.value

        const oldPasswordResult = this.authService.verifyPassword(
            command.oldPassword,
            user.getDetails.password
        )
        if (oldPasswordResult.isErr()) return err(oldPasswordResult.error)

        const userToBeSaved = this.authService.changePassword(
            user,
            command.newPassword
        )

        if (userToBeSaved.isErr()) return err(userToBeSaved.error)

        const changePasswordResult =
            await this.userWriteRepository.changePassword(userToBeSaved.value)

        if (changePasswordResult.isErr()) return err(changePasswordResult.error)

        return ok(undefined)
    }
}
