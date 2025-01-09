import { WorkerRepository } from '../../domain/worker.repository'
import { ListWorkersQuery } from '../queries/list-workers.query'

export class ListWorkersHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute({ page, limit, searchTerm }: ListWorkersQuery) {
        const skip = (page - 1) * limit

        const [workers, total] = await Promise.all([
            this.workerRepository.getWorkers({ skip, limit, searchTerm }),
            this.workerRepository.countAll(searchTerm),
        ])

        return { workers: workers.map((workers) => workers.getWorker), total }
    }
}
