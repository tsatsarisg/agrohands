import { Job } from '../../domain/job.entity'
import { JobRepository } from '../../domain/job.repository'

export class CreateJobHandler {
    constructor(private jobRepository: JobRepository) {}

    async execute(
        title: string,
        description: string,
        company: string,
        createdBy: string
    ): Promise<Job> {
        const job = Job.create(title, description, company, createdBy)
        await this.jobRepository.save(job)
        return job
    }
}
