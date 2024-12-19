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

        const worker = await this.workerComponent.getWorker(id as string)

        return res.status(200).json(worker)
    }

    list = async (req: Request, res: Response) => {
        const workers = await this.workerComponent.getWorkers()

        return res.status(200).json(workers)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.workerComponent.createWorker(value)

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
        })

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.workerComponent.deleteWorker(id))
    }
}
