/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from 'neverthrow'
import Worker from './worker.entity'

export type GetPaginatedWorkersProps = {
    skip: number
    limit: number
    searchTerm?: string
}

export interface WorkerWriteRepository {
    createWorker(worker: Worker): Promise<Result<string, string>>
    update(worker: Worker): Promise<Result<string, string>>
    delete(id: string): Promise<void>
}

export interface WorkerReadRepository {
    findByID(id: string): Promise<Result<Worker, string>>
    findByUserID(userID: string): Promise<Result<Worker, string>>
    countAll(searchTerm?: string): Promise<number>
    findAll(props: GetPaginatedWorkersProps): Promise<Result<Worker[], string>>
}
