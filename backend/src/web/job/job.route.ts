import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import authenticateJWT from '../middlewares/authenticateJWT'
import { JobController } from './job.controller'
import validateBody from '../middlewares/validateBody'
import { createSchema } from './schemas'

const router = ({ jobComponent }: Components) => {
    const servicePaths = Router()
    const jobController = new JobController(
        jobComponent.createJobHandler,
        jobComponent.listJobsHandler
    )

    servicePaths.get(
        '/jobs',
        authenticateJWT,
        errorWrapper(jobController.listJobs)
    )
    servicePaths.post(
        '/jobs',
        authenticateJWT,
        validateBody(createSchema),
        errorWrapper(jobController.createJob)
    )

    return servicePaths
}

export default router
