import { Request, Response } from 'express'
import { IWorkerComponent } from '../../components/worker'
import { createSchema, updateSchema } from './schemas'

export default class WorkerController {
    constructor(private workerComponent: IWorkerComponent) {
        this.workerComponent = workerComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const worker = await this.workerComponent.getWorkerByID(id as string)

        return res.status(200).json(worker)
    }

    getPersonalWorker = async (req: Request, res: Response) => {
        const worker = await this.workerComponent.getWorkerByUserID(
            req.userID as string
        )

        return res.status(200).json(worker)
    }

    list = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 8
        const searchTerm = req.query.searchTerm as string

        const workers = await this.workerComponent.getWorkers({
            searchTerm,
            page,
            limit,
        })

        return res.status(200).json(workers)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.workerComponent.createWorker({
            ...value,
            userID: req.userID,
        })

        return res.status(201).json(franchise)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const { error, value } = updateSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.workerComponent.updateWorker({
            id,
            ...value,
            userID: req.userID,
        })

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.workerComponent.deleteWorker(id))
    }
}
