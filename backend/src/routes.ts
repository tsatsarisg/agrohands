import { Components } from './components'
import franchiseRouter from './web/franchise/franchise.route'
import userRouter from './web/user/user.route'

export default (components: Components) => ({
    franchiseRoutes: franchiseRouter(components),
    userRoutes: userRouter(components),
})
