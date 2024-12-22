import { MongoAdapter } from '../utils/MongoDBAdapter'
import { getEnv } from '../utils/env'
import { IWorkerComponent, buildWorkerComponent } from './worker'
import { IAuthComponent, buildAuthComponent } from './auth'

export interface Components {
    authComponent: IAuthComponent
    workerComponent: IWorkerComponent
}

const buildComponents = (mongoAdapter: MongoAdapter): Components => {
    const authComponent = buildAuthComponent({
        userCollection: mongoAdapter.collection(getEnv('USER_COLLECTION_NAME')),
    })

    const workerComponent = buildWorkerComponent({
        workerCollection: mongoAdapter.collection(
            getEnv('WORKER_COLLECTION_NAME')
        ),
    })

    return {
        authComponent,
        workerComponent,
    }
}

export default buildComponents
