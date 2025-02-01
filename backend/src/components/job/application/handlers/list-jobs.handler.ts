import { JobReadRepository } from '../../domain/job.repository'
import { ListJobsQuery } from '../queries/list-jobs.query'

export class ListJobsHandler {
    constructor(private jobRepository: JobReadRepository) {}

    async execute(query: ListJobsQuery) {
        const { page, limit } = query

        const [result, total] = await Promise.all([
            this.jobRepository.findPaginated(page, limit),
            this.jobRepository.countAll(),
        ])

        const jobs = result.isOk() ? result.value : []
        return { jobs: jobs.map((job) => job.getJob), total }
    }
}
