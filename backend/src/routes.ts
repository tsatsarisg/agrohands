import { Components } from './components'
import workerRouter from './web/worker/worker.route'
import authRouter from './web/auth/auth.route'

export default (components: Components) => ({
    workerRoutes: workerRouter(components),
    authRouter: authRouter(components),
})
