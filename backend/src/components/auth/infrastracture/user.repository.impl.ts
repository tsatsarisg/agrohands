import { Collection, Document, WithId } from 'mongodb'
import { UserRepository } from '../domain/user.repository'
import { User } from '../domain/user.entity'

export class MongoUserRepository implements UserRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async save(user: User): Promise<User> {
        const result = await this.collection.insertOne({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
        })

        if (!result.acknowledged) {
            throw new Error('User not saved')
        }

        return new User(
            result.insertedId.toString(),
            user.fullName,
            user.email,
            user.password
        )
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await this.collection.findOne({ email })
        return userDoc ? this.toDomain(userDoc) : null
    }

    async findById(id: string): Promise<User | null> {
        const userDoc = await this.collection.findOne({ id })
        return userDoc ? this.toDomain(userDoc) : null
    }

    private toDomain(userDoc: WithId<Document>): User {
        return new User(
            userDoc.id,
            userDoc.fullName,
            userDoc.email,
            userDoc.password
        )
    }
}
