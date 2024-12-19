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

    async getWorkers() {
        const cursor = this.collection.find()
        const filteredDocs = await cursor.toArray()

        if (!filteredDocs) throw new Error('No matches found.')

        const typedFilteredDocs = plainToClass(filteredDocs, WorkerModel)

        return typedFilteredDocs
    }

    async createWorker(worker: WorkerModel) {
        const createdWorker = await this.collection.insertOne(worker.getWorker)

        return createdWorker
    }

    async updateWorker(worker: WorkerModel) {
        const { id, ...restWorker } = worker.getWorker
        const createdWorker = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    firstName: restWorker.firstName,
                },
            }
        )

        return createdWorker
    }

    async deleteWorker(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
