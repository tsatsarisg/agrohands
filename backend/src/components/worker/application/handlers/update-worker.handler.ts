import { err } from 'neverthrow'
import Worker from '../../domain/worker.entity'
import {
    WorkerReadRepository,
    WorkerWriteRepository,
} from '../../domain/worker.repository'
import { UpdateWorkerCommand } from '../commands/update-worker.command'

export class UpdateWorkerHandler {
    constructor(
        private workerWriteRepository: WorkerWriteRepository,
        private workerReadRepository: WorkerReadRepository
    ) {}

    async execute(command: UpdateWorkerCommand) {
        const updatedWorkerResult = Worker.create({
            ...command,
        })

        if (updatedWorkerResult.isErr()) {
            return err(updatedWorkerResult.error)
        }

        const updatedWorker = updatedWorkerResult.value

        return this.workerWriteRepository.update(updatedWorker)
    }
}
