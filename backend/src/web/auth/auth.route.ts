import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import { AuthController } from './auth.controller'
import authenticateJWT from '../middlewares/authenticateJWT'
import validateBody from '../middlewares/validateBody'
import { changePasswordSchema, loginSchema, signupSchema } from './schemas'

const router = ({ authComponent }: Components) => {
    const servicePaths = Router()
    const authController = new AuthController(
        authComponent.signupUserHandler,
        authComponent.loginUserHandler,
        authComponent.changeUserPasswordHandler
    )

    servicePaths.post(
        '/signup',
        validateBody(signupSchema),
        errorWrapper(authController.signup)
    )
    servicePaths.post(
        '/login',
        validateBody(loginSchema),
        errorWrapper(authController.login)
    )
    servicePaths.patch(
        '/changePassword',
        authenticateJWT,
        validateBody(changePasswordSchema),
        errorWrapper(authController.changePassword)
    )

    return servicePaths
}

export default router
