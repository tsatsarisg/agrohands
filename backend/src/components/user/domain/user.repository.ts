import { Result } from 'neverthrow'
import { User } from './user.entity'

export interface UserReadRepository {
    findByID(id: string): Promise<Result<User, string>>
}

export interface UserWriteRepository {
    updateEmail(user: User): Promise<Result<void, string>>
}
