import { Collection } from 'mongodb'
import { ListJobsHandler } from './application/handlers/list-jobs.handler'
import { MongoJobRepository } from './infrastructure/job.repository.impl'
import { CreateJobHandler } from './application/handlers/create-job.handler'

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
    const jobRepo = new MongoJobRepository(jobCollection)
    return {
        listJobsHandler: new ListJobsHandler(jobRepo),
        createJobHandler: new CreateJobHandler(jobRepo),
    }
}

export { CreateJobCommand } from './application/commands/create-job.command'
export { ListJobsQuery } from './application/queries/list-jobs.query'
