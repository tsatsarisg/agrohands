import { Request, Response } from 'express'
import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import {
    changePasswordCommand,
    LoginUserCommand,
    SignupUserCommand,
} from '../../components/auth'
import { ChangePasswordBody, LoginBody, SignUpBody } from './schemas'
import { ChangeUserPasswordHandler } from '../../components/auth/application/handlers/change-password.handler'
import logger from '../../utils/logger'

export class AuthController {
    constructor(
        private signupHandler: SignupUserHandler,
        private loginHandler: LoginUserHandler,
        private changePasswordHandler: ChangeUserPasswordHandler
    ) {}

    signup = async (req: Request, res: Response) => {
        const { fullName, email, password } = req.body as SignUpBody
        const command = new SignupUserCommand(fullName, email, password)
        const result = await this.signupHandler.execute(command)
        logger.info({ email, ok: result.isOk() }, `New signup request`)

        result
            .map(({ id }) => {
                res.status(200).json({ id })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body as LoginBody
        const command = new LoginUserCommand(email, password)
        const result = await this.loginHandler.execute(command)
        logger.info({ email, ok: result.isOk() }, `New login request`)

        result
            .map(({ token }) => {
                res.status(200).json({ token })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    changePassword = async (req: Request, res: Response) => {
        const { currentPassword, newPassword, confirmNewPassword } =
            req.body as ChangePasswordBody
        const command = new changePasswordCommand(
            req.userID as string,
            currentPassword,
            newPassword,
            confirmNewPassword
        )

        const result = await this.changePasswordHandler.execute(command)
        logger.info(
            { id: req.userID, ok: result.isOk() },
            `Password change request`
        )

        result
            .map(() => {
                res.status(200).json({ message: 'Password saved successfully' })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }
}
