import { Collection } from 'mongodb'
import { ListJobsHandler } from './application/queries/list-jobs.handler'
import { CreateJobHandler } from './application/commands/create-job.handler'
import { MongoJobRepository } from './infrastructure/job.repository.impl'

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
