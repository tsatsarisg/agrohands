import { Result } from 'neverthrow'
import { Job } from './job.entity'

export interface JobReadRepository {
    countAll(): Promise<number>
    findPaginated(page: number, limit: number, userID?: string): Promise<Result<Job[], string>>
}

export interface JobWriteRepository {
    save(job: Job): Promise<Result<{ id: string }, string>>
}
