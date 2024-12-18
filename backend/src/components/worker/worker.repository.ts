import { Collection, ObjectId } from 'mongodb'
import WorkerModel from './worker.model'

import plainToClass from '../../utils/plainToClass'
import { WorkerProps } from '.'

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
            name: WorkerDocument.name,
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

    async createWorker(props: WorkerProps) {
        const Worker = new WorkerModel(props)

        const createdWorker = await this.collection.insertOne(Worker.getWorker)

        return createdWorker
    }

    async deleteWorker(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
