import { Job } from './job.entity'

export interface JobRepository {
    countAll(): Promise<number>
    findPaginated(skip: number, limit: number): Promise<Job[]>
    save(job: Job): Promise<void>
}
