import { Request, Response } from 'express'
import {
    CreateWorkerCommand,
    DeleteWorkerCommand,
    GetWorkerByIDQuery,
    GetWorkerByUserIDQuery,
    IWorkerComponent,
    ListWorkersQuery,
    UpdateWorkerCommand,
} from '../../components/worker'

export default class WorkerController {
    constructor(private workerComponent: IWorkerComponent) {
        this.workerComponent = workerComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })
        const query = new GetWorkerByIDQuery(id)

        const result = await this.workerComponent.getWorkerByID.execute(query)

        result
            .map((worker) => {
                res.status(200).json(worker.getDetails)
            })
            .mapErr((error: string) => {
                res.status(404).json({ error })
            })
    }

    getPersonalWorker = async (req: Request, res: Response) => {
        const query = new GetWorkerByUserIDQuery(req.userID as string)

        const result = await this.workerComponent.getWorkerByUserID.execute(
            query
        )

        result
            .map((worker) => {
                res.status(200).json(worker.getDetails)
            })
            .mapErr((error: string) => {
                res.status(404).json({ error })
            })
    }

    list = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 8
        const searchTerm = req.query.searchTerm as string

        const query = new ListWorkersQuery(page, limit, searchTerm)

        const workers = await this.workerComponent.listWorkersHandler.execute(
            query
        )

        return res.status(200).json(workers)
    }

    create = async (req: Request, res: Response) => {
        const { description, title, firstName, lastName, location, skills } =
            req.body

        const command = new CreateWorkerCommand(
            req.userID as string,
            description,
            title,
            firstName,
            lastName,
            location,
            skills
        )

        const result = await this.workerComponent.createWorkerHandler.execute(
            command
        )

        result
            .map((workerID: string) => {
                res.status(201).json({ workerID })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const { description, title, firstName, lastName, location, skills } =
            req.body
        const command = new UpdateWorkerCommand(
            req.userID as string,
            description,
            id,
            title,
            firstName,
            lastName,
            location,
            skills
        )

        const result = await this.workerComponent.updateWorkerHandler.execute(
            command
        )

        result
            .map((t: undefined) => {
                res.status(201).json({ message: 'Success' })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const command = new DeleteWorkerCommand(id)

        await this.workerComponent.deleteWorkerHandler.execute(command)

        return res.status(200)
    }
}
