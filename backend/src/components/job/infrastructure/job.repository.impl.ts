import { Collection, Document, WithId } from 'mongodb'
import { Job } from '../domain/job.entity'
import { JobRepository } from '../domain/job.repository'

export class MongoJobRepository implements JobRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async save(job: Job): Promise<void> {
        await this.collection.insertOne(job)
    }

    async findAll(): Promise<Job[]> {
        const filteredDocs = await this.collection.find().toArray()
        return filteredDocs.map((doc) => this.toDomain(doc))
    }

    private toDomain(jobDoc: WithId<Document>): Job {
        return Job.create(
            jobDoc.title,
            jobDoc.description,
            jobDoc.company,
            jobDoc.createdBy
        )
    }
}
