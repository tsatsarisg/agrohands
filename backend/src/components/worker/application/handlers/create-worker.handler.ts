import Worker from '../../domain/worker.entity'
import { WorkerRepository } from '../../domain/worker.repository'
import { CreateWorkerCommand } from '../commands/create-worker.command'

export class CreateWorkerHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute(props: CreateWorkerCommand) {
        const worker = new Worker({ id: 'new', ...props })
        await this.workerRepository.createWorker(worker)
        return worker.getWorker
    }
}
