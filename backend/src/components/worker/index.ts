import { Collection } from 'mongodb'
import WorkerRepository from './worker.repository'
import WorkerService from './worker.service'

export type WorkerProps = {
    name: string
}

export interface Worker {
    name: string
}

export interface IWorkerComponent {
    getWorker(id: string): Promise<Worker>
    getWorkers(): Promise<Worker[]>
    createWorker(props: WorkerProps): Promise<Worker>
    deleteWorker(id: string): Promise<void>
}

export interface WorkerComponentDependencies {
    workerCollection: Collection
}

export const buildWorkerComponent = ({
    workerCollection,
}: WorkerComponentDependencies): IWorkerComponent => {
    const franchiseRepository = new WorkerRepository(workerCollection)
    return new WorkerService(franchiseRepository)
}
