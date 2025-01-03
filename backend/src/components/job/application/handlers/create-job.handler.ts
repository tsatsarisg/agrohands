import { Job } from '../../domain/job.entity'
import { JobRepository } from '../../domain/job.repository'
import { CreateJobCommand } from '../commands/create-job.command'

export class CreateJobHandler {
    constructor(private jobRepository: JobRepository) {}

    async execute(command: CreateJobCommand): Promise<Job | string> {
        try {
            const job = new Job(command)
            const id = await this.jobRepository.save(job)
            job.setID = id
            return job
        } catch (error) {
            return (error as Error).message
        }
    }
}
