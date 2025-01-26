import { Request, Response } from 'express'

import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import {
    changePasswordCommand,
    LoginUserCommand,
    SignupUserCommand,
} from '../../components/auth'
import { changePasswordSchema, loginSchema, signupSchema } from './schemas'
import { ChangeUserPasswordHandler } from '../../components/auth/application/handlers/change-password.handler'

export class AuthController {
    constructor(
        private signupHandler: SignupUserHandler,
        private loginHandler: LoginUserHandler,
        private changePasswordHandler: ChangeUserPasswordHandler
    ) {}

    signup = async (req: Request, res: Response) => {
        const { error, value } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const command = new SignupUserCommand(
            value.fullName,
            value.email,
            value.password
        )
        const result = await this.signupHandler.execute(command)

        result
            .map(({ id }) => {
                res.status(200).json({ id })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    login = async (req: Request, res: Response) => {
        const { error, value } = loginSchema.validate(req.body)
        if (error) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password.' })
        }
        const command = new LoginUserCommand(value.email, value.password)
        const result = await this.loginHandler.execute(command)

        result
            .map(({ token }) => {
                res.status(200).json({ token })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }

    changePassword = async (req: Request, res: Response) => {
        const { error, value } = changePasswordSchema.validate(req.body)
        if (error) {
            return res
                .status(400)
                .json({ message: 'Request missing properties' })
        }
        const command = new changePasswordCommand(
            req.userID as string,
            value.currentPassword,
            value.newPassword,
            value.confirmNewPassword
        )

        const result = await this.changePasswordHandler.execute(command)

        result
            .map(() => {
                res.status(200).json({ message: 'Password saved successfully' })
            })
            .mapErr((error: string) => {
                res.status(400).json({ error })
            })
    }
}
