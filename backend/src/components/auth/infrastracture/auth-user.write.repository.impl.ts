import { Collection, ObjectId } from 'mongodb'
import { AuthUserWriteRepository } from '../domain/auth-user.repository'
import { AuthUser } from '../domain/auth-user.entity'
import { err, ok, Result } from 'neverthrow'

export class MongoUserWriteRepository implements AuthUserWriteRepository {
    constructor(private collection: Collection) {}

    async save(user: AuthUser): Promise<Result<AuthUser, string>> {
        const result = await this.collection.insertOne({
            fullName: user.getDetails.fullName,
            email: user.getDetails.email,
            password: user.getDetails.password,
        })

        if (!result.acknowledged) return err('Error in saving user.')

        return AuthUser.create({
            id: result.insertedId.toString(),
            fullName: user.getDetails.fullName,
            email: user.getDetails.email,
            password: user.getDetails.password,
        })
    }

    async changePassword(user: AuthUser): Promise<Result<void, string>> {
        await this.collection.updateOne(
            { _id: new ObjectId(user.getDetails.id) },
            { $set: { password: user.getDetails.password } }
        )
        return ok(undefined)
    }
}
