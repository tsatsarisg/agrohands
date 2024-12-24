import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import { AuthController } from './auth.controller'

const router = ({ authComponent }: Components) => {
    const servicePaths = Router()
    const authController = new AuthController(
        authComponent.signupUserHandler,
        authComponent.loginUserHandler
    )

    servicePaths.post('/signup', errorWrapper(authController.signup))
    servicePaths.post('/login', errorWrapper(authController.login))

    return servicePaths
}

export default router
