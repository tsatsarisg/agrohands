import { WorkerReadRepository } from '../../domain/worker.repository'
import { GetWorkerByUserIDQuery } from '../queries/get-worker-by-userID.query'

export class GetWorkerByUserIDHandler {
    constructor(private workerRepository: WorkerReadRepository) {}

    async execute({ userID }: GetWorkerByUserIDQuery) {
        return this.workerRepository.findByUserID(userID)
    }
}
