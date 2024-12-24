import { UserRepository } from '../../domain/user.repository'
import { AuthService } from '../../services/auth.service'
import { SignupUserCommand } from '../commands/signup-user.command'

export class SignupUserHandler {
    private userRepository: UserRepository
    private authService: AuthService
    constructor(userRepository: UserRepository, authService: AuthService) {
        this.userRepository = userRepository
        this.authService = authService
    }

    async execute(
        command: SignupUserCommand
    ): Promise<{ id?: string; error?: string }> {
        const existingUser = await this.userRepository.findByEmail(
            command.email
        )
        if (existingUser) {
            return { error: 'User already exists' }
        }

        const hashedPassword = this.authService.hashPassword(command.password)

        const userToBeSaved = this.authService.createUser(
            command.email,
            hashedPassword,
            command.name
        )

        const newUser = await this.userRepository.save(userToBeSaved)

        return { id: newUser.id }
    }
}
