import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import authenticateJWT from '../middlewares/authenticateJWT'
import { JobController } from './job.controller'

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
        errorWrapper(jobController.createJob)
    )

    return servicePaths
}

export default router
