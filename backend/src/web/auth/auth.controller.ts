import { Request, Response } from 'express'

import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import { LoginUserCommand, SignupUserCommand } from '../../components/auth'

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
        await this.signupHandler.execute(command)
        res.status(201).json({ message: 'User registered successfully' })
    }

    login = async (req: Request, res: Response) => {
        const command = new LoginUserCommand(req.body.email, req.body.password)
        const token = await this.loginHandler.execute(command)
        res.status(200).json({ token })
    }
}
