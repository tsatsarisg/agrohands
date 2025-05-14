import { JobReadRepository } from '../../domain/job.repository'
import { ListJobsQuery } from '../queries/list-jobs.query'
import { ListPersonalJobsQuery } from '../queries/list-personal-jobs.query'

export class ListPersonalJobsHandler {
    constructor(private jobRepository: JobReadRepository) {}

    async execute(query: ListPersonalJobsQuery) {
        const { page, limit, userID } = query

        const [result, total] = await Promise.all([
            this.jobRepository.findPaginated(page, limit, userID),
            this.jobRepository.countAll(),
        ])

        const jobs = result.isOk() ? result.value : []
        return { jobs: jobs.map((job) => job.getJob), total }
    }
}
