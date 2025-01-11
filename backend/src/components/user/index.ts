import { Collection } from 'mongodb'
import { MongoUserRepository } from './infrastracture/user.repository.impl'
import { GetUserEmailHandler } from './application/handlers/get-user-email.handler'
import { GetUserEmailQuery } from './application/queries/get-user-email.query'

export interface IUserComponent {
    getUserHandler: GetUserEmailHandler
}

export interface UserComponentDependencies {
    userCollection: Collection
}

export const buildUserComponent = ({
    userCollection,
}: UserComponentDependencies): IUserComponent => {
    const userRepo = new MongoUserRepository(userCollection)

    return {
        getUserHandler: new GetUserEmailHandler(userRepo),
    }
}

export { GetUserEmailQuery }
