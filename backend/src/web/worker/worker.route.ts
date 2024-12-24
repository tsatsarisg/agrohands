import { Router } from 'express'
import WorkerController from './worker.controller'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import authenticateJWT from '../middlewares/authenticateJWT'

const router = ({ workerComponent: franchisesComponent }: Components) => {
    const servicePaths = Router()
    const workerController = new WorkerController(franchisesComponent)

    servicePaths.get(
        '/workers/:id',
        authenticateJWT,
        errorWrapper(workerController.get)
    )
    servicePaths.get(
        '/workers',
        authenticateJWT,
        errorWrapper(workerController.list)
    )
    servicePaths.post(
        '/workers',
        authenticateJWT,
        errorWrapper(workerController.create)
    )
    servicePaths.put(
        '/workers/:id',
        authenticateJWT,
        errorWrapper(workerController.update)
    )
    servicePaths.delete(
        '/workers/:id',
        authenticateJWT,
        workerController.delete
    )

    return servicePaths
}

export default router
