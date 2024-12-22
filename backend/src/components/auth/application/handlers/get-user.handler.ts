import { UserRepository } from '../../domain/user.repository'
import { GetUserQuery } from '../commands/get-user.query'

export class GetUserHandler {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(query: GetUserQuery): Promise<{ id: string; email: string }> {
        const user = await this.userRepository.findById(query.userId)
        if (!user) {
            throw new Error('User not found')
        }

        return { id: user.id, email: user.email }
    }
}
