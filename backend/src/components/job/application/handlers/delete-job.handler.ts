import { JobWriteRepository } from '../../domain/job.repository'
import { DeleteJobCommand } from '../commands/delete-job.command'

export class DeleteJobByIDHandler {
    constructor(private jobRepo: JobWriteRepository) {}

    async execute({ id }: DeleteJobCommand) {
        await this.jobRepo.delete(id)
    }
}
