import { Collection, ObjectId } from 'mongodb'
import UserModel from './user.model'

export type UserDocument = {
    _id: ObjectId
    email: string
    password: string
}

export default class UserRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async getUser(id: string) {
        const userDoc = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!userDoc) throw new Error('No matches found.')
        const { _id, ...restUser } = userDoc as UserDocument

        return new UserModel({
            id: _id.toString(),
            ...restUser,
        })
    }

    async createUser(props: { email: string; password: string }) {
        const createdFranchise = await this.collection.insertOne(props)

        return await this.getUser(createdFranchise.insertedId.toString())
    }

    async deleteUser(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
