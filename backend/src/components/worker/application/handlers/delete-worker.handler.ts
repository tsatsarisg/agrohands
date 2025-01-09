import { WorkerRepository } from '../../domain/worker.repository'
import { DeleteWorkerCommand } from '../commands/delete-worker.command'

export class DeleteWorkerByIDHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute({ id }: DeleteWorkerCommand) {
        await this.workerRepository.deleteWorker(id)
    }
}
