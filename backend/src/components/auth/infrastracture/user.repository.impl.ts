import { Collection, Document, WithId } from 'mongodb'
import { UserRepository } from '../domain/user.repository'
import { User } from '../domain/user.entity'

export class MongoUserRepository implements UserRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async save(user: User): Promise<void> {
        await this.collection.updateOne(
            { id: user.id },
            { $set: user },
            { upsert: true }
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
        return new User(userDoc.id, userDoc.email, userDoc.password)
    }
}
