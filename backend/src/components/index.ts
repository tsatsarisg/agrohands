import { MongoAdapter } from '../utils/MongoDBAdapter'
import { getEnv } from '../utils/env'
import { IWorkerComponent, buildWorkerComponent } from './worker'
import { IUsersComponent, buildUsersComponent } from './user'

export interface Components {
    usersComponent: IUsersComponent
    workerComponent: IWorkerComponent
}

const buildComponents = (mongoAdapter: MongoAdapter): Components => {
    const usersComponent = buildUsersComponent({
        userCollection: mongoAdapter.collection(getEnv('USER_COLLECTION_NAME')),
    })

    const workerComponent = buildWorkerComponent({
        workerCollection: mongoAdapter.collection(
            getEnv('WORKER_COLLECTION_NAME')
        ),
    })

    return {
        usersComponent,
        workerComponent,
    }
}

export default buildComponents
