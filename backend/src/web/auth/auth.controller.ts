import { Request, Response } from 'express'

import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import { LoginUserCommand, SignupUserCommand } from '../../components/auth'
import { loginSchema } from './schemas'

export class AuthController {
    private signupHandler: SignupUserHandler
    private loginHandler: LoginUserHandler
    constructor(
        signupHandler: SignupUserHandler,
        loginHandler: LoginUserHandler
    ) {
        this.signupHandler = signupHandler
        this.loginHandler = loginHandler
    }

    signup = async (req: Request, res: Response) => {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        const command = new SignupUserCommand(fullName, email, password)
        const result = await this.signupHandler.execute(command)
        if (result.error) {
            return res.status(400).json({ message: result.error })
        }
        res.status(201).json({ message: 'User registered successfully' })
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

        if (result.error) {
            return res.status(400).json({ message: result.error })
        }

        return res.status(200).json({ token: result.token })
    }
}
