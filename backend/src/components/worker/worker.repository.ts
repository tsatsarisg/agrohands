import { Collection, ObjectId } from 'mongodb'
import WorkerModel from './worker.model'

import plainToClass from '../../utils/plainToClass'

export type WorkerDocument = {
    _id?: ObjectId
    name: string
}

export default class WorkerRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async getWorker(id: string) {
        const WorkerDocument = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!WorkerDocument) throw new Error('No matches found.')

        const Worker = new WorkerModel({
            id,
            title: WorkerDocument.title,
            firstName: WorkerDocument.firstName,
            lastName: WorkerDocument.lastName,
            location: WorkerDocument.location,
            skills: WorkerDocument.skills,
        })

        return Worker
    }

    async getWorkers(searchTerm?: string): Promise<WorkerModel[]> {
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

        const filteredDocs = await this.collection.find(query).toArray()
        return plainToClass(filteredDocs, WorkerModel)
    }

    async createWorker(worker: WorkerModel) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...restWorker } = worker.getWorker
        const createdWorker = await this.collection.insertOne(restWorker)

        return createdWorker
    }

    async updateWorker(worker: WorkerModel) {
        const { id, ...restWorker } = worker.getWorker
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
