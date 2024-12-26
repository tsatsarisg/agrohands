import WorkerRepository from './worker.repository'
import WorkerModel from './worker.model'
import { IWorkerComponent, CreateWorkerProps, UpdateWorkerProps } from '.'

export default class WorkerService implements IWorkerComponent {
    private repository: WorkerRepository

    constructor(workerRepository: WorkerRepository) {
        this.repository = workerRepository
    }

    async getWorkerByID(id: string) {
        const worker = await this.repository.getWorkerByID(id)
        return worker.getWorker
    }

    async getWorkerByUserID(userID: string) {
        const worker = await this.repository.getWorkerByUserID(userID)
        return worker?.getWorker || null
    }

    async getWorkers(searchTerm?: string) {
        const workers = await this.repository.getWorkers(searchTerm)
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
