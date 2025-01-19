import { Collection, ObjectId } from 'mongodb'
import Worker from '../domain/worker.entity'
import { WorkerWriteRepository } from '../domain/worker.repository'
import { err, ok } from 'neverthrow'

export type WorkerDocument = {
    _id?: ObjectId
    name: string
}

export type GetPaginatedWorkersProps = {
    skip: number
    limit: number
    searchTerm?: string
}

export default class MongoWriteWorkerRepository
    implements WorkerWriteRepository
{
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async createWorker(worker: Worker) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...restWorker } = worker.getDetails
        const result = await this.collection.insertOne({
            ...restWorker,
            userID: new ObjectId(worker.getDetails.userID),
        })

        if (result.acknowledged) {
            return ok(result.insertedId.toString())
        } else {
            return err('Failed to insert worker into the database.')
        }
    }

    async update(worker: Worker) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, userID, ...workerData } = worker.getDetails

        const existingWorker = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!existingWorker) {
            return err(`Worker with ID ${id} not found.`)
        }

        const updateResult = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: workerData }
        )

        if (updateResult.modifiedCount === 0) {
            return err(
                `Worker with ID ${id} was not updated. No changes detected.`
            )
        }

        return ok(undefined)
    }

    async delete(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
