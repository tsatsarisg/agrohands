import Worker from '../../domain/worker.entity'
import { WorkerRepository } from '../../domain/worker.repository'
import { UpdateWorkerCommand } from '../commands/update-worker.command'

export class UpdateWorkerHandler {
    constructor(private workerRepository: WorkerRepository) {}

    async execute(props: UpdateWorkerCommand) {
        const worker = new Worker({ ...props })
        await this.workerRepository.updateWorker(worker)
        return worker.getWorker
    }
}
