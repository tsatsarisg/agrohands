import { MongoAdapter } from '../utils/MongoDBAdapter'
import { getEnv } from '../utils/env'
import { IWorkerComponent, buildWorkerComponent } from './worker'
import { IAuthComponent, buildAuthComponent } from './auth'
import { buildJobComponent, IJobComponent } from './job'
import { buildUserComponent, IUserComponent } from './user'

export interface Components {
    authComponent: IAuthComponent
    workerComponent: IWorkerComponent
    jobComponent: IJobComponent
    userComponent: IUserComponent
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

    const jobComponent = buildJobComponent({
        jobCollection: mongoAdapter.collection(getEnv('JOB_COLLECTION_NAME')),
    })

    const userComponent = buildUserComponent({
        userCollection: mongoAdapter.collection(getEnv('USER_COLLECTION_NAME')),
    })

    return {
        authComponent,
        workerComponent,
        jobComponent,
        userComponent,
    }
}

export default buildComponents
