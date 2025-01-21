import { Collection } from 'mongodb'
import { MongoReadUserRepository } from './infrastracture/user.read.repository.impl'
import { GetUserEmailHandler } from './application/handlers/get-user-email.handler'
import { GetUserEmailQuery } from './application/queries/get-user-email.query'
import { UpdateUserEmailHandler } from './application/handlers/update-email.handler'
import { MongoWriteUserRepository } from './infrastracture/user.write.repository.impl'

export interface IUserComponent {
    getUserHandler: GetUserEmailHandler
    updateUserEmailHandler: UpdateUserEmailHandler
}

export interface UserComponentDependencies {
    userCollection: Collection
}

export const buildUserComponent = ({
    userCollection,
}: UserComponentDependencies): IUserComponent => {
    const userReadRepo = new MongoReadUserRepository(userCollection)
    const userWriteRepo = new MongoWriteUserRepository(userCollection)

    return {
        getUserHandler: new GetUserEmailHandler(userReadRepo),
        updateUserEmailHandler: new UpdateUserEmailHandler(
            userWriteRepo,
            userReadRepo
        ),
    }
}

export { GetUserEmailQuery }
