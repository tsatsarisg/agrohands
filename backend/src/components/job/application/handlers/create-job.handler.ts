import { err } from 'neverthrow'
import { Job } from '../../domain/job.entity'
import { JobWriteRepository } from '../../domain/job.repository'
import { CreateJobCommand } from '../commands/create-job.command'

export class CreateJobHandler {
    constructor(private jobRepository: JobWriteRepository) {}

    async execute(props: CreateJobCommand) {
        const result = Job.create({ ...props })
        if (result.isErr()) return err(result.error)

        const worker = result.value
        return this.jobRepository.save(worker)
    }
}
