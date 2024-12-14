import { IUsersComponent } from '.'
import User from './user.model'
import UserRepository from './user.repository'

export default class UserService implements IUsersComponent {
    private repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async getUser(id: string): Promise<User> {
        return await this.repository.getUser(id)
    }

    async createUser(props: { email: string; password: string }) {
        return await this.repository.createUser(props)
    }

    async deleteUser(id: string) {
        await this.repository.deleteUser(id)
    }
}
