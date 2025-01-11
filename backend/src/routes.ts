import { Components } from './components'
import workerRouter from './web/worker/worker.route'
import authRouter from './web/auth/auth.route'
import jobRouter from './web/job/job.route'
import userRouter from './web/user/user.route'

export default (components: Components) => ({
    workerRoutes: workerRouter(components),
    authRouter: authRouter(components),
    jobRouter: jobRouter(components),
    userRouter: userRouter(components),
})
