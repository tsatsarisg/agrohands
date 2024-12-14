import { MongoAdapter } from '../utils/MongoDBAdapter'
import { getEnv } from '../utils/env'
import { IFranchisesComponent, buildFranchisesComponent } from './franchise'
import { IUsersComponent, buildUsersComponent } from './user'

export interface Components {
    usersComponent: IUsersComponent
    franchisesComponent: IFranchisesComponent
}

const buildComponents = (mongoAdapter: MongoAdapter): Components => {
    const usersComponent = buildUsersComponent({
        userCollection: mongoAdapter.collection(getEnv('USER_COLLECTION_NAME')),
    })

    const franchisesComponent = buildFranchisesComponent({
        franchiseCollection: mongoAdapter.collection(
            getEnv('FRANCHISE_COLLECTION_NAME')
        ),
    })

    return {
        usersComponent,
        franchisesComponent,
    }
}

export default buildComponents
