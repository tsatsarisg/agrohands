import WorkerRepository from './worker.repository'
import WorkerModel from './worker.model'
import { IWorkerComponent, CreateWorkerProps, UpdateWorkerProps } from '.'

export default class WorkerService implements IWorkerComponent {
    private repository: WorkerRepository

    constructor(workerRepository: WorkerRepository) {
        this.repository = workerRepository
    }

    async getWorker(id: string) {
        const worker = await this.repository.getWorker(id)
        return worker.getWorker
    }

    async getWorkers() {
        const workers = await this.repository.getWorkers()

        return workers.map((worker) => worker.getWorker)
    }

    async createWorker(props: CreateWorkerProps) {
        const worker = new WorkerModel({ id: 'new', ...props })
        await this.repository.createWorker(worker)
        return worker.getWorker
    }

    async updateWorker(props: UpdateWorkerProps) {
        const worker = new WorkerModel({ ...props })
        await this.repository.updateWorker(worker)
        return worker.getWorker
    }

    async deleteWorker(id: string) {
        await this.repository.deleteWorker(id)
    }
}
