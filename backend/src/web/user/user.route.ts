import { Router } from 'express'
import UserController from './user.controller'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'

const router = ({ usersComponent }: Components) => {
    const servicePaths = Router()
    const userController = new UserController(usersComponent)

    servicePaths.get('/users', errorWrapper(userController.get))
    servicePaths.post('/users', errorWrapper(userController.create))
    servicePaths.delete('/users/:id', userController.delete)

    return servicePaths
}

export default router
