import { Collection, Document, ObjectId, WithId } from 'mongodb'
import { UserReadRepository } from '../domain/user.repository'
import { User } from '../domain/user.entity'
import { err } from 'neverthrow'

export class MongoReadUserRepository implements UserReadRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async findByID(id: string) {
        const userDoc = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!userDoc) return err('Not found')

        return User.create({
            id: userDoc._id.toString(),
            fullName: userDoc.fullName,
            email: userDoc.email,
        })
    }
}
