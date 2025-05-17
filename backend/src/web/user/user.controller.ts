import { Request, Response } from 'express'
import { GetUserEmailQuery, IUserComponent } from '../../components/user'
import { EmailBody } from './schemas'
import { UpdateUserEmailCommand } from '../../components/user/application/commands/update-email.command'
import logger from '../../utils/logger'

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
        const { email } = req.body as EmailBody
        const command = new UpdateUserEmailCommand(req.userID as string, email)
        const result = await this.userComponent.updateUserEmailHandler.execute(
            command
        )

        logger.info(
            { userID: req.userID, email, ok: result.isOk() },
            `Email change request`
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
