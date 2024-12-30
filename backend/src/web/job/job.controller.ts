import { Request, Response } from 'express'
import { CreateJobHandler } from '../../components/job/application/commands/create-job.handler'
import { ListJobsHandler } from '../../components/job/application/queries/list-jobs.handler'

export class JobController {
    constructor(
        private createJobHandler: CreateJobHandler,
        private listJobsHandler: ListJobsHandler
    ) {}

    async createJob(req: Request, res: Response): Promise<Response> {
        const { title, description, company } = req.body
        const createdBy = req.userID as string

        const job = await this.createJobHandler.execute(
            title,
            description,
            company,
            createdBy
        )
        return res.status(201).json(job)
    }

    async listJobs(req: Request, res: Response): Promise<Response> {
        const jobs = await this.listJobsHandler.execute()
        return res.status(200).json(jobs)
    }
}
