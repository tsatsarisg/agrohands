import { Request, Response } from 'express'
import Joi from 'joi'
import { IFranchisesComponent } from '../../components/franchise'

const createSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
})

export default class FranchiseController {
    constructor(private franchisesComponent: IFranchisesComponent) {
        this.franchisesComponent = franchisesComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.query
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const franchise = await this.franchisesComponent.getFranchise(
            id as string
        )

        return res.status(200).json(franchise)
    }

    list = async (req: Request, res: Response) => {
        const franchises = await this.franchisesComponent.getFranchises()

        return res.status(200).json(franchises)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.franchisesComponent.createFranchise(value)

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.franchisesComponent.deleteFranchise(id))
    }
}
