import { Collection } from 'mongodb'
import WorkerRepository from './worker.repository'
import WorkerService from './worker.service'

export type CreateWorkerProps = {
    userID: string
    description: string
    title: string
    firstName: string
    lastName: string
    location: string
    skills: string[]
}

export type UpdateWorkerProps = {
    userID: string
    description: string
    id: string
    title: string
    firstName: string
    lastName: string
    location: string
    skills: string[]
}

export interface Worker {
    id: string
    userID: string
    description: string
    title: string
    firstName: string
    lastName: string
    location: string
    skills: string[]
}

export interface IWorkerComponent {
    getWorkerByID(id: string): Promise<Worker>
    getWorkerByUserID(id: string): Promise<Worker | null>
    getWorkers(searchTerm?: string): Promise<Worker[]>
    createWorker(props: CreateWorkerProps): Promise<Worker>
    updateWorker(props: UpdateWorkerProps): Promise<Worker>
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
