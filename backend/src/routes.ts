import { Components } from './components'
import workerRouter from './web/worker/worker.route'
import authRouter from './web/auth/auth.route'
import jobRouter from './web/job/job.route'

export default (components: Components) => ({
    workerRoutes: workerRouter(components),
    authRouter: authRouter(components),
    jobRouter: jobRouter(components),
})
