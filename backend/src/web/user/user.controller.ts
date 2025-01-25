import { Request, Response } from 'express'
import { GetUserEmailQuery, IUserComponent } from '../../components/user'
import { updateEmailSchema } from './schemas'
import { UpdateUserEmailCommand } from '../../components/user/application/commands/update-email.command'

export class UserController {
    constructor(private userComponent: IUserComponent) {
        this.userComponent = userComponent
    }

    findUser = async (req: Request, res: Response) => {
        const userID = req.userID as string
        const query = new GetUserEmailQuery(userID)

        const result = await this.userComponent.getUserHandler.execute(query)

        result
            .map((user) => {
                res.status(200).json(user.getDetails)
            })
            .mapErr((error: string) => {
                res.status(404).json({ error })
            })
    }

    updateEmail = async (req: Request, res: Response) => {
        const { error, value } = updateEmailSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: 'No email provided' })
        }

        const command = new UpdateUserEmailCommand(
            req.userID as string,
            value.email
        )

        const result = await this.userComponent.updateUserEmailHandler.execute(
            command
        )

        result
            .map(() => {
                res.status(200).json({ message: 'Success' })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }
}
