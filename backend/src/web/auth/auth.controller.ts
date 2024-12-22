import { Request, Response } from 'express'

import { GetUserHandler } from '../../components/auth/application/handlers/get-user.handler'
import { LoginUserHandler } from '../../components/auth/application/handlers/login-user.handler'
import { SignupUserHandler } from '../../components/auth/application/handlers/signup-user.handler'
import { LoginUserCommand, SignupUserCommand } from '../../components/auth'

export class AuthController {
    constructor(
        private signupHandler: SignupUserHandler,
        private loginHandler: LoginUserHandler,
        private getUserHandler: GetUserHandler
    ) {}

    async signup(req: Request, res: Response) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).send({ error: 'All fields are required' })
        }

        const command = new SignupUserCommand(name, email, password)
        await this.signupHandler.execute(command)
        res.status(201).send({ message: 'User registered successfully' })
    }

    async login(req: Request, res: Response) {
        const command = new LoginUserCommand(req.body.email, req.body.password)
        const token = await this.loginHandler.execute(command)
        res.status(200).send({ token })
    }
}
