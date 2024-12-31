import { Request, Response } from 'express'
import { ListJobsHandler } from '../../components/job/application/queries/list-jobs.handler'
import { CreateJobHandler } from '../../components/job/application/handlers/create-job.handler'
import { CreateJobCommand } from '../../components/job'

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
        const { title, description, company, location } = req.body
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
        const jobs = await this.listJobsHandler.execute()
        return res.status(200).json(jobs)
    }
}
