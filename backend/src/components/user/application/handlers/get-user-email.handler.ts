import { UserReadRepository } from '../../domain/user.repository'
import { GetUserEmailQuery } from '../queries/get-user-email.query'

export class GetUserEmailHandler {
    constructor(private userRepository: UserReadRepository) {}

    async execute(query: GetUserEmailQuery) {
        return this.userRepository.findByID(query.userID)
    }
}
