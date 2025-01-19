import { WorkerReadRepository } from '../domain/worker.repository'
import Worker from '../domain/worker.entity'
import { err, ok } from 'neverthrow'
import { Collection, ObjectId } from 'mongodb'

export type WorkerDocument = {
    _id?: ObjectId
    name: string
}

export type GetPaginatedWorkersProps = {
    skip: number
    limit: number
    searchTerm?: string
}

export default class MongoReadWorkerRepository implements WorkerReadRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async findByID(id: string) {
        const doc = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!doc) return err('Not found')

        return Worker.create({
            id,
            title: doc.title,
            firstName: doc.firstName,
            lastName: doc.lastName,
            location: doc.location,
            skills: doc.skills,
            description: doc.description,
            userID: doc.userID.toString(),
        })
    }

    async findByUserID(userID: string) {
        const doc = await this.collection.findOne({
            userID: new ObjectId(userID),
        })

        if (!doc) return err('Not found')

        const worker = Worker.create({
            id: doc._id.toString(),
            title: doc.title,
            firstName: doc.firstName,
            lastName: doc.lastName,
            location: doc.location,
            skills: doc.skills,
            description: doc.description,
            userID: doc.userID.toString(),
        })

        return worker
    }

    async countAll(searchTerm?: string): Promise<number> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {}
        if (searchTerm) {
            const regex = { $regex: searchTerm, $options: 'i' }
            query.$or = [
                { firstName: regex },
                { lastName: regex },
                { location: regex },
            ]
        }
        return this.collection.countDocuments(query)
    }

    async findAll({ searchTerm, skip, limit }: GetPaginatedWorkersProps) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {}
        if (searchTerm) {
            const regex = { $regex: searchTerm, $options: 'i' }
            query.$or = [
                { firstName: regex },
                { lastName: regex },
                { location: regex },
            ]
        }

        const filteredDocs = await this.collection
            .find(query)
            .skip(skip)
            .limit(limit)
            .toArray()

        const result = filteredDocs.map((doc) =>
            Worker.create({
                id: doc._id.toString(),
                title: doc.title,
                firstName: doc.firstName,
                lastName: doc.lastName,
                location: doc.location,
                skills: doc.skills,
                description: doc.description,
                userID: doc.userID.toString(),
            })
        )

        const errors = result.filter((result) => result.isErr())
        if (errors.length > 0) {
            return err(
                `Failed to parse workers: ${errors
                    .map((e) => e.error)
                    .join(', ')}`
            )
        }

        const workers = result
            .filter((result) => result.isOk())
            .map((result) => result.value)
        return ok(workers)
    }
}
