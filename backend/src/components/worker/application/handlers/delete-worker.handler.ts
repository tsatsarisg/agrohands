import { WorkerWriteRepository } from '../../domain/worker.repository'
import { DeleteWorkerCommand } from '../commands/delete-worker.command'

export class DeleteWorkerByIDHandler {
    constructor(private workerRepository: WorkerWriteRepository) {}

    async execute({ id }: DeleteWorkerCommand) {
        await this.workerRepository.delete(id)
    }
}
