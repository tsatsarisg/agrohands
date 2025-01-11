import { Collection, Document, WithId } from 'mongodb'
import { UserRepository } from '../domain/user.repository'
import { User } from '../domain/user.entity'

export class MongoUserRepository implements UserRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async findById(id: string): Promise<User | null> {
        const userDoc = await this.collection.findOne({ id })
        return userDoc ? this.toDomain(userDoc) : null
    }

    private toDomain(userDoc: WithId<Document>): User {
        return new User(userDoc._id.toString(), userDoc.fullName, userDoc.email)
    }
}
