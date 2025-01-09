/* eslint-disable @typescript-eslint/no-explicit-any */
import Worker from './worker.entity'

export type GetPaginatedWorkersProps = {
    skip: number
    limit: number
    searchTerm?: string
}

export interface WorkerRepository {
    getWorkerByID(id: string): Promise<Worker | null>
    getWorkerByUserID(userID: string): Promise<Worker | null>
    countAll(searchTerm?: string): Promise<number>
    getWorkers(props: GetPaginatedWorkersProps): Promise<Worker[]>
    createWorker(worker: Worker): Promise<any>
    updateWorker(worker: Worker): Promise<any>
    deleteWorker(id: string): Promise<void>
}
