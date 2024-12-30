// src/components/jobs/application/queries/list-jobs.handler.ts
import { Job } from '../../domain/job.entity'
import { JobRepository } from '../../domain/job.repository'

export class ListJobsHandler {
    constructor(private jobRepository: JobRepository) {}

    async execute(): Promise<Job[]> {
        return this.jobRepository.findAll()
    }
}
