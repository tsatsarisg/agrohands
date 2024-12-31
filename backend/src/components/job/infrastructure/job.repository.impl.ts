import { Collection, Document, ObjectId, WithId } from 'mongodb'
import { Job } from '../domain/job.entity'
import { JobRepository } from '../domain/job.repository'

export class MongoJobRepository implements JobRepository {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async save(job: Job): Promise<void> {
        const jobDto = job.getJob
        const userID = new ObjectId(jobDto.createdBy)
        await this.collection.insertOne({
            title: jobDto.title,
            description: jobDto.description,
            company: jobDto.company,
            location: jobDto.location,
            datePosted: jobDto.datePosted,
            userID,
            salary: jobDto?.salary,
        })
    }

    async countAll(): Promise<number> {
        return this.collection.countDocuments()
    }
    async findPaginated(skip: number, limit: number): Promise<Job[]> {
        const filteredDocs = await this.collection
            .find()
            .skip(skip)
            .limit(limit)
            .toArray()
        return filteredDocs.map((doc) => this.toDomain(doc))
    }

    private toDomain(jobDoc: WithId<Document>): Job {
        return new Job({
            id: jobDoc._id.toString(),
            title: jobDoc.title,
            description: jobDoc.description,
            company: jobDoc.company,
            location: jobDoc.location,
            datePosted: jobDoc.datePosted,
            createdBy: jobDoc.userID.toString(),
            salary: jobDoc?.salary,
        })
    }
}
