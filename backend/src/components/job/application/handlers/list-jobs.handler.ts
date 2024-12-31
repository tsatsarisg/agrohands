import { Job } from '../../domain/job.entity'
import { JobRepository } from '../../domain/job.repository'
import { ListJobsQuery } from '../queries/list-jobs.query'

export class ListJobsHandler {
    constructor(private jobRepository: JobRepository) {}

    async execute(
        query: ListJobsQuery
    ): Promise<{ jobs: Job[]; total: number }> {
        const { page, limit } = query

        const skip = (page - 1) * limit

        const [jobs, total] = await Promise.all([
            this.jobRepository.findPaginated(skip, limit),
            this.jobRepository.countAll(),
        ])

        return { jobs, total }
    }
}
