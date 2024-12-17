import { Components } from './components'
import workerRouter from './web/worker/worker.route'
import userRouter from './web/user/user.route'

export default (components: Components) => ({
    workerRoutes: workerRouter(components),
    userRoutes: userRouter(components),
})
