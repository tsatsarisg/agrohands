import { WorkerRepository } from '../../domain/worker.repository'
import { GetWorkerByUserIDQuery } from '../queries/get-worker-by-userID.query'

export class GetWorkerByUserIDHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute({ userID }: GetWorkerByUserIDQuery) {
        const worker = await this.workerRepository.getWorkerByUserID(userID)
        return worker?.getWorker || null
    }
}
