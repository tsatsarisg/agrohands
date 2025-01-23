export class ChangeUserPasswordHandler {
    constructor(
        private readonly userRepository: UserWriteRepository,
        private readonly userReadRepository: UserReadRepository
    ) {}

    async execute(
        command: UpdateUserEmailCommand
    ): Promise<Result<void, string>> {
        const userResult = await this.userReadRepository.findByID(
            command.userID
        )

        if (userResult.isErr()) {
            return err(userResult.error)
        }

        const user = userResult.value

        const changeEmailResult = user.changeEmail(command.email)
        if (changeEmailResult.isErr()) {
            return err(changeEmailResult.error)
        }

        const saveResult = await this.userRepository.updateEmail(user)

        if (saveResult.isErr()) return err(saveResult.error)

        return ok(undefined)
    }
}
