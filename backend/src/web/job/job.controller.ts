import { Request, Response } from 'express'
import {
    CreateJobCommand,
    DeleteJobCommand,
    IJobComponent,
    ListJobsQuery,
} from '../../components/job'

export class JobController {
    constructor(private jobComponent: IJobComponent) {
        this.jobComponent = jobComponent
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

        const result = await this.jobComponent.createJobHandler.execute(command)

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
        const { type } = req.query
        const userID = type === 'personal' ? req.userID : undefined

        const query = new ListJobsQuery(page, limit, userID)
        const { jobs, total } = await this.jobComponent.listJobsHandler.execute(
            query
        )

        return res.status(200).json({ jobs, total })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })
        const command = new DeleteJobCommand(id, req.userID as string)

        await this.jobComponent.deleteJobHandler.execute(command)

        return res.status(200)
    }
}
