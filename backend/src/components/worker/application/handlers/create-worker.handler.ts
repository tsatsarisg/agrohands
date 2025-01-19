import { err } from 'neverthrow'
import Worker from '../../domain/worker.entity'
import { WorkerWriteRepository } from '../../domain/worker.repository'
import { CreateWorkerCommand } from '../commands/create-worker.command'

export class CreateWorkerHandler {
    constructor(private workerRepository: WorkerWriteRepository) {}

    async execute(props: CreateWorkerCommand) {
        const result = Worker.create({ id: 'new', ...props })
        if (result.isErr()) {
            return err(result.error)
        }
        const worker = result.value
        return this.workerRepository.createWorker(worker)
    }
}
