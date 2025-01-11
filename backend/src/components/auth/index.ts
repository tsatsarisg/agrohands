import { Collection } from 'mongodb'

import { MongoUserRepository } from './infrastracture/user.repository.impl'
import { LoginUserHandler } from './application/handlers/login-user.handler'
import { SignupUserHandler } from './application/handlers/signup-user.handler'
import { SignupUserCommand } from './application/commands/signup-user.command'
import { LoginUserCommand } from './application/commands/login-user.command'
import { AuthService } from './services/auth.service'

export interface IAuthComponent {
    loginUserHandler: LoginUserHandler
    signupUserHandler: SignupUserHandler
}

export interface AuthComponentDependencies {
    userCollection: Collection
}

export const buildAuthComponent = ({
    userCollection,
}: AuthComponentDependencies): IAuthComponent => {
    const userRepo = new MongoUserRepository(userCollection)
    const authService = new AuthService()

    return {
        loginUserHandler: new LoginUserHandler(userRepo, authService),
        signupUserHandler: new SignupUserHandler(userRepo, authService),
    }
}

export { SignupUserCommand, LoginUserCommand }
