import { Collection, ObjectId } from 'mongodb'
import { UserWriteRepository } from '../domain/user.repository'
import { User } from '../domain/user.entity'
import { ok, Result } from 'neverthrow'

export class MongoWriteUserRepository implements UserWriteRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async updateEmail(user: User): Promise<Result<void, string>> {
        await this.collection.updateOne(
            { _id: new ObjectId(user.getDetails.id) },
            { $set: { email: user.getDetails.email } }
        )
        return ok(undefined)
    }
}
