import { UserRepository } from '../../domain/user.repository'
import { GetUserEmailQuery } from '../queries/get-user-email.query'

export class GetUserEmailHandler {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(query: GetUserEmailQuery): Promise<{ email: string } | null> {
        const user = await this.userRepository.findById(query.userID)
        if (!user) return null

        return { email: user.email }
    }
}
