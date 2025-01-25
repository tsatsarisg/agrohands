import { Collection } from 'mongodb'
import { LoginUserHandler } from './application/handlers/login-user.handler'
import { SignupUserHandler } from './application/handlers/signup-user.handler'
import { SignupUserCommand } from './application/commands/signup-user.command'
import { LoginUserCommand } from './application/commands/login-user.command'
import { AuthService } from './services/auth.service'
import { MongoUserWriteRepository } from './infrastracture/auth-user.write.repository.impl'
import { MongoUserReadRepository } from './infrastracture/auth-user.read.repository.impl'
import { ChangeUserPasswordHandler } from './application/handlers/change-password.handler'
import { changePasswordCommand } from './application/commands/change-password.command'

export interface IAuthComponent {
    loginUserHandler: LoginUserHandler
    signupUserHandler: SignupUserHandler
    changeUserPasswordHandler: ChangeUserPasswordHandler
}

export interface AuthComponentDependencies {
    userCollection: Collection
}

export const buildAuthComponent = ({
    userCollection,
}: AuthComponentDependencies): IAuthComponent => {
    const userReadRepo = new MongoUserReadRepository(userCollection)
    const userWriteRepo = new MongoUserWriteRepository(userCollection)

    const authService = new AuthService()

    return {
        loginUserHandler: new LoginUserHandler(userReadRepo, authService),
        signupUserHandler: new SignupUserHandler(
            userReadRepo,
            userWriteRepo,
            authService
        ),
        changeUserPasswordHandler: new ChangeUserPasswordHandler(
            userReadRepo,
            userWriteRepo,
            authService
        ),
    }
}

export { SignupUserCommand, LoginUserCommand, changePasswordCommand }
