import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import { UserController } from './user.controller'

const router = ({ userComponent }: Components) => {
    const servicePaths = Router()
    const userController = new UserController(userComponent)

    servicePaths.get('/users/email', errorWrapper(userController.getUserEmail))

    return servicePaths
}

export default router
