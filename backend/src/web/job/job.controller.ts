import { Request, Response } from 'express'
import { ListJobsHandler } from '../../components/job/application/handlers/list-jobs.handler'
import { CreateJobHandler } from '../../components/job/application/handlers/create-job.handler'
import { CreateJobCommand, ListJobsQuery } from '../../components/job'
import { ListPersonalJobsQuery } from '../../components/job/application/queries/list-personal-jobs.query'

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

    createJob = async (req: Request, res: Response) => {
        const { title, description, company, location } = req.body
        const command = new CreateJobCommand(
            title,
            description,
            company,
            location,
            req.userID as string
        )

        const result = await this.createJobHandler.execute(command)

        result
            .map(({ id }) => {
                res.status(201).json({ id })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    listJobs = async (req: Request, res: Response): Promise<Response> => {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 8

        const query = new ListJobsQuery(page, limit)
        const { jobs, total } = await this.listJobsHandler.execute(query)

        return res.status(200).json({ jobs, total })
    }

    listPersonalJobs = async (req: Request, res: Response): Promise<Response> => {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 8
        const userID = req.userID as string;

        const query = new ListPersonalJobsQuery(page, limit, userID)
        const { jobs, total } = await this.listJobsHandler.execute(query)

        return res.status(200).json({ jobs, total })
    }
}
