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
import { createSchema, updateSchema } from './schemas'

export default class WorkerController {
    constructor(private workerComponent: IWorkerComponent) {
        this.workerComponent = workerComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })
        const query = new GetWorkerByIDQuery(id)

        const worker = await this.workerComponent.getWorkerByID.execute(query)

        return res.status(200).json(worker)
    }

    getPersonalWorker = async (req: Request, res: Response) => {
        const query = new GetWorkerByUserIDQuery(req.userID as string)

        const worker = await this.workerComponent.getWorkerByUserID.execute(
            query
        )

        return res.status(200).json(worker)
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
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const command = new CreateWorkerCommand(
            req.userID as string,
            value.description,
            value.title,
            value.firstName,
            value.lastName,
            value.location,
            value.skills
        )

        const franchise =
            await this.workerComponent.createWorkerHandler.execute(command)

        return res.status(201).json(franchise)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const { error, value } = updateSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const command = new UpdateWorkerCommand(
            req.userID as string,
            value.description,
            id,
            value.title,
            value.firstName,
            value.lastName,
            value.location,
            value.skills
        )

        const franchise =
            await this.workerComponent.updateWorkerHandler.execute(command)

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const command = new DeleteWorkerCommand(id)

        return res.json(
            await this.workerComponent.deleteWorkerHandler.execute(command)
        )
    }
}
