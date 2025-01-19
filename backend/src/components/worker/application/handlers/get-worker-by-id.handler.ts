import { WorkerReadRepository } from '../../domain/worker.repository'
import { GetWorkerByIDQuery } from '../queries/get-worker-by-id.query'

export class GetWorkerByIDHandler {
    constructor(private workerRepository: WorkerReadRepository) {}

    async execute({ id }: GetWorkerByIDQuery) {
        return this.workerRepository.findByID(id)
    }
}
