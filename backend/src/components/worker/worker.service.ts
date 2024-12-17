import WorkerRepository from './worker.repository'
import WorkerModel from './worker.model'
import { WorkerProps, IWorkerComponent } from '.'

export default class WorkerService implements IWorkerComponent {
    private repository: WorkerRepository

    constructor(workerRepository: WorkerRepository) {
        this.repository = workerRepository
    }

    async getWorker(id: string) {
        return (await this.repository.getWorker(id)).getWorker
    }

    async getWorkers() {
        const workers = await this.repository.getWorkers()

        return workers.map((worker) => worker.getWorker)
    }

    async createWorker(props: WorkerProps) {
        const worker = new WorkerModel({ ...props })
        await this.repository.createWorker(props)
        return worker.getWorker
    }

    async deleteWorker(id: string) {
        await this.repository.deleteWorker(id)
    }
}
