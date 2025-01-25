import { Collection, ObjectId } from 'mongodb'
import { AuthUserWriteRepository } from '../domain/auth-user.repository'
import { AuthUser } from '../domain/auth-user.entity'
import { err, ok, Result } from 'neverthrow'

export class MongoUserWriteRepository implements AuthUserWriteRepository {
    constructor(private collection: Collection) {}

    async save(user: AuthUser) {
        const result = await this.collection.insertOne({
            fullName: user.getDetails.fullName,
            email: user.getDetails.email,
            password: user.getDetails.password,
        })

        if (!result.acknowledged) return err('Error in saving user.')

        return ok({ id: result.insertedId.toString() })
    }

    async changePassword(user: AuthUser): Promise<Result<void, string>> {
        await this.collection.updateOne(
            { _id: new ObjectId(user.getDetails.id) },
            { $set: { password: user.getDetails.password } }
        )
        return ok(undefined)
    }
}
