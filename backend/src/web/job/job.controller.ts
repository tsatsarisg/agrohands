import { Request, Response } from 'express'
import { ListJobsHandler } from '../../components/job/application/handlers/list-jobs.handler'
import { CreateJobHandler } from '../../components/job/application/handlers/create-job.handler'
import { CreateJobCommand, ListJobsQuery } from '../../components/job'
import { createSchema } from './schemas'

export class JobController {
    private createJobHandler: CreateJobHandler
    private listJobsHandler: ListJobsHandler

    constructor(
        createJobHandler: CreateJobHandler,
        listJobsHandler: ListJobsHandler
    ) {
        this.createJobHandler = createJobHandler
        this.listJobsHandler = listJobsHandler
    }

    createJob = async (req: Request, res: Response): Promise<Response> => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }
        const { title, description, company, location } = value
        const createdBy = req.userID as string
        const command = new CreateJobCommand(
            title,
            description,
            company,
            location,
            createdBy
        )

        const job = await this.createJobHandler.execute(command)
        return res.status(201).json(job)
    }

    listJobs = async (req: Request, res: Response): Promise<Response> => {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 8

        const query = new ListJobsQuery(page, limit)
        const { jobs, total } = await this.listJobsHandler.execute(query)
        return res.status(200).json({ jobs, total })
    }
}
