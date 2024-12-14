import { Collection } from 'mongodb'
import User from './user.model'
import UserRepository from './user.repository'
import UserService from './user.service'

export interface IUsersComponent {
    getUser(id: string): Promise<User>
    createUser(props: { email: string; password: string }): Promise<User>
    deleteUser(id: string): Promise<void>
}

export interface UserComponentDependencies {
    userCollection: Collection
}

export const buildUsersComponent = ({
    userCollection,
}: UserComponentDependencies): IUsersComponent => {
    const userRepo = new UserRepository(userCollection)
    return new UserService(userRepo)
}
