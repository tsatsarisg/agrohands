import { Collection, ObjectId } from 'mongodb'
import { Job } from '../domain/job.entity'
import { JobReadRepository } from '../domain/job.repository'
import { err, ok } from 'neverthrow'

export class MongoJobReadRepository implements JobReadRepository {
    constructor(private collection: Collection) {}

    async countAll(): Promise<number> {
        return this.collection.countDocuments()
    }

    async findPaginated(page: number, limit: number, userID?: string) {
        const skip = (page - 1) * limit
        const query = userID ? { createdBy: new ObjectId(userID)} : {}

        const filteredDocs = await this.collection
            .find(query)
            .sort({ datePosted: -1 })
            .skip(skip)
            .limit(limit)
            .toArray()

        const result = filteredDocs.map((doc) =>
            Job.create({
                id: doc._id.toString(),
                title: doc.title,
                description: doc.description,
                company: doc.company,
                location: doc.location,
                datePosted: doc.datePosted,
                createdBy: doc.userID.toString(),
                salary: doc?.salary,
            })
        )

        const errors = result.filter((result) => result.isErr())
        if (errors.length > 0) {
            return err(
                `Failed to parse jobs: ${errors.map((e) => e.error).join(', ')}`
            )
        }

        const jobs = result
            .filter((result) => result.isOk())
            .map((result) => result.value)
        return ok(jobs)
    }
}
