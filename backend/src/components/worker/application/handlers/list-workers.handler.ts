import { WorkerReadRepository } from '../../domain/worker.repository'
import { ListWorkersQuery } from '../queries/list-workers.query'

export class ListWorkersHandler {
    constructor(private workerRepository: WorkerReadRepository) {}

    async execute({ page, limit, searchTerm }: ListWorkersQuery) {
        const skip = (page - 1) * limit

        const [result, total] = await Promise.all([
            this.workerRepository.findAll({ skip, limit, searchTerm }),
            this.workerRepository.countAll(searchTerm),
        ])

        const workers = result.isOk() ? result.value : []
        return { workers: workers.map((workers) => workers.getDetails), total }
    }
}
