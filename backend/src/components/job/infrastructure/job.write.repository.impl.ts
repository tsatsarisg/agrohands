import { Collection, ObjectId } from 'mongodb'
import { Job } from '../domain/job.entity'
import { JobWriteRepository } from '../domain/job.repository'
import { err, ok } from 'neverthrow'

export default class MongoJobWriteRepository implements JobWriteRepository {
    constructor(private collection: Collection) {}

    async save(job: Job) {
        const jobDto = job.getJob
        const userID = new ObjectId(jobDto.createdBy)

        const result = await this.collection.insertOne({
            title: jobDto.title,
            description: jobDto.description,
            company: jobDto.company,
            location: jobDto.location,
            datePosted: jobDto.datePosted,
            userID,
            salary: jobDto?.salary,
        })

        if (!result.acknowledged) return err('Error in saving job')

        return ok({ id: result.insertedId.toString() })
    }

    async delete(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
