import { Job } from '../../domain/job.entity'
import { JobRepository } from '../../domain/job.repository'
import { CreateJobCommand } from '../commands/create-job.command'

export class CreateJobHandler {
    constructor(private jobRepository: JobRepository) {}

    async execute(command: CreateJobCommand): Promise<Job> {
        const job = new Job(command)
        await this.jobRepository.save(job)
        return job
    }
}
