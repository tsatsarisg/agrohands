import { Collection, ObjectId } from 'mongodb'
import WorkerModel from './worker.model'

import plainToClass from '../../utils/plainToClass'

export type WorkerDocument = {
    _id?: ObjectId
    name: string
}

export type GetPaginatedWorkersProps = {
    skip: number
    limit: number
    searchTerm?: string
}

export default class WorkerRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async getWorkerByID(id: string) {
        const WorkerDocument = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!WorkerDocument) throw new Error('No matches found.')

        const worker = new WorkerModel({
            id,
            title: WorkerDocument.title,
            firstName: WorkerDocument.firstName,
            lastName: WorkerDocument.lastName,
            location: WorkerDocument.location,
            skills: WorkerDocument.skills,
            description: WorkerDocument.description,
            userID: WorkerDocument.userID.toString(),
        })

        return worker
    }

    async getWorkerByUserID(userID: string) {
        const WorkerDocument = await this.collection.findOne({
            userID: new ObjectId(userID),
        })

        if (!WorkerDocument) return null

        const worker = new WorkerModel({
            id: WorkerDocument._id.toString(),
            title: WorkerDocument.title,
            firstName: WorkerDocument.firstName,
            lastName: WorkerDocument.lastName,
            location: WorkerDocument.location,
            skills: WorkerDocument.skills,
            description: WorkerDocument.description,
            userID: WorkerDocument.userID.toString(),
        })

        return worker
    }

    async countAll(): Promise<number> {
        return this.collection.countDocuments()
    }

    async getWorkers({
        searchTerm,
        skip,
        limit,
    }: GetPaginatedWorkersProps): Promise<WorkerModel[]> {
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
        return plainToClass(filteredDocs, WorkerModel)
    }

    async createWorker(worker: WorkerModel) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...restWorker } = worker.getWorker
        const createdWorker = await this.collection.insertOne({
            ...restWorker,
            userID: new ObjectId(worker.getWorker.userID),
        })

        return createdWorker
    }

    async updateWorker(worker: WorkerModel) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, userID, ...restWorker } = worker.getWorker
        const createdWorker = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...restWorker,
                },
            }
        )

        return createdWorker
    }

    async deleteWorker(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
