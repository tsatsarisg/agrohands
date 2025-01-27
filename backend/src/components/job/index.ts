import { Collection } from 'mongodb'
import { ListJobsHandler } from './application/handlers/list-jobs.handler'
import { MongoJobReadRepository } from './infrastructure/job.read.repository.impl'
import { CreateJobHandler } from './application/handlers/create-job.handler'
import MongoJobWriteRepository from './infrastructure/job.write.repository.impl'

export interface IJobComponent {
    listJobsHandler: ListJobsHandler
    createJobHandler: CreateJobHandler
}

export interface JobComponentDependencies {
    jobCollection: Collection
}

export const buildJobComponent = ({
    jobCollection,
}: JobComponentDependencies): IJobComponent => {
    const jobReadRepo = new MongoJobReadRepository(jobCollection)
    const jobWriteRepo = new MongoJobWriteRepository(jobCollection)

    return {
        listJobsHandler: new ListJobsHandler(jobReadRepo),
        createJobHandler: new CreateJobHandler(jobWriteRepo),
    }
}

export { CreateJobCommand } from './application/commands/create-job.command'
export { ListJobsQuery } from './application/queries/list-jobs.query'
