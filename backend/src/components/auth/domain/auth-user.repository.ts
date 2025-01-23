import { Result } from 'neverthrow'
import { AuthUser } from './auth-user.entity'

export interface AuthUserReadRepository {
    findByEmail(email: string): Promise<Result<AuthUser, string>>
    findByID(id: string): Promise<Result<AuthUser, string>>
}

export interface AuthUserWriteRepository {
    save(user: AuthUser): Promise<Result<AuthUser, string>>
    changePassword(user: AuthUser): Promise<Result<void, string>>
}
