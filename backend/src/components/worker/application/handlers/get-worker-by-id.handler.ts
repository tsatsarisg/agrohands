import { WorkerRepository } from '../../domain/worker.repository'
import { GetWorkerByIDQuery } from '../queries/get-worker-by-id.query'

export class GetWorkerByIDHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute({ id }: GetWorkerByIDQuery) {
        const worker = await this.workerRepository.getWorkerByID(id)
        return worker?.getWorker || null
    }
}
