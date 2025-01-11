import { Request, Response } from 'express'
import { GetUserEmailQuery, IUserComponent } from '../../components/user'

export class UserController {
    constructor(private userComponent: IUserComponent) {
        this.userComponent = userComponent
    }

    getUserEmail = async (req: Request, res: Response): Promise<Response> => {
        const userID = req.userID as string
        const query = new GetUserEmailQuery(userID)

        const emailHandlerResponse =
            await this.userComponent.getUserHandler.execute(query)
        if (!emailHandlerResponse)
            return res.status(404).json({ message: 'Not Found' })

        return res.status(200).json(emailHandlerResponse)
    }
}
