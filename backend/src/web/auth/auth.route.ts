import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import { AuthController } from './auth.controller'
import authenticateJWT from '../middlewares/authenticateJWT'

const router = ({ authComponent }: Components) => {
    const servicePaths = Router()
    const authController = new AuthController(
        authComponent.signupUserHandler,
        authComponent.loginUserHandler,
        authComponent.changeUserPasswordHandler
    )

    servicePaths.post('/signup', errorWrapper(authController.signup))
    servicePaths.post('/login', errorWrapper(authController.login))
    servicePaths.patch(
        '/changePassword',
        authenticateJWT,
        errorWrapper(authController.changePassword)
    )

    return servicePaths
}

export default router
