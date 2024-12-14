import Joi from 'joi'
import { Request, Response } from 'express'
import { IUsersComponent } from '../../components/user'

const createSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export default class UserController {
    constructor(private usersComponent: IUsersComponent) {
        this.usersComponent = usersComponent
    }

    get = async (req: Request, res: Response) => {
        const { id } = req.query
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        const franchise = await this.usersComponent.getUser(id as string)

        return res.status(200).json(franchise)
    }

    create = async (req: Request, res: Response) => {
        const { error, value } = createSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error })
        }

        const franchise = await this.usersComponent.createUser(value)

        return res.status(201).json(franchise)
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'No id provided.' })

        return res.json(await this.usersComponent.deleteUser(id))
    }
}
