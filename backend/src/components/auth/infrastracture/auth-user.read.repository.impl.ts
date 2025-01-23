import { Collection, ObjectId } from 'mongodb'
import { AuthUserReadRepository } from '../domain/auth-user.repository'
import { AuthUser } from '../domain/auth-user.entity'
import { err } from 'neverthrow'

export class MongoUserReadRepository implements AuthUserReadRepository {
    constructor(private collection: Collection) {}

    async findByEmail(email: string) {
        const userDoc = await this.collection.findOne({
            email,
        })

        if (!userDoc) return err('Not found')

        return AuthUser.create({
            id: userDoc._id.toString(),
            fullName: userDoc.fullName,
            email: userDoc.email,
            password: userDoc.password,
        })
    }

    async findByID(id: string) {
        const userDoc = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!userDoc) return err('Not found')

        return AuthUser.create({
            id: userDoc._id.toString(),
            fullName: userDoc.fullName,
            email: userDoc.email,
            password: userDoc.password,
        })
    }
}
