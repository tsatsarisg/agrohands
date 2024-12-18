import { Router } from 'express'
import WorkerController from './worker.controller'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'

const router = ({ workerComponent: franchisesComponent }: Components) => {
    const servicePaths = Router()
    const workerController = new WorkerController(franchisesComponent)

    servicePaths.get('/workers/:id', errorWrapper(workerController.get))
    servicePaths.get('/workers', errorWrapper(workerController.list))
    servicePaths.post('/workers', errorWrapper(workerController.create))
    servicePaths.delete('/workers/:id', workerController.delete)

    return servicePaths
}

export default router
