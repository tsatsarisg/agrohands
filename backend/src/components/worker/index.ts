import { Collection } from 'mongodb'
import { GetWorkerByUserIDHandler } from './application/handlers/get-worker-by-userid.handler'
import { GetWorkerByIDHandler } from './application/handlers/get-worker-by-id.handler'
import { ListWorkersHandler } from './application/handlers/list-workers.handler'
import { CreateWorkerHandler } from './application/handlers/create-worker.handler'
import { UpdateWorkerHandler } from './application/handlers/update-worker.handler'
import { DeleteWorkerByIDHandler } from './application/handlers/delete-worker.handler'
import MongoWorkerRepository from './infrastructure/worker.repository.impl'

export interface IWorkerComponent {
    getWorkerByID: GetWorkerByIDHandler
    getWorkerByUserID: GetWorkerByUserIDHandler
    listWorkersHandler: ListWorkersHandler
    createWorkerHandler: CreateWorkerHandler
    updateWorkerHandler: UpdateWorkerHandler
    deleteWorkerHandler: DeleteWorkerByIDHandler
}

export interface WorkerComponentDependencies {
    workerCollection: Collection
}

export const buildWorkerComponent = ({
    workerCollection,
}: WorkerComponentDependencies): IWorkerComponent => {
    const workerRepo = new MongoWorkerRepository(workerCollection)
    return {
        getWorkerByID: new GetWorkerByIDHandler(workerRepo),
        getWorkerByUserID: new GetWorkerByUserIDHandler(workerRepo),
        listWorkersHandler: new ListWorkersHandler(workerRepo),
        createWorkerHandler: new CreateWorkerHandler(workerRepo),
        updateWorkerHandler: new UpdateWorkerHandler(workerRepo),
        deleteWorkerHandler: new DeleteWorkerByIDHandler(workerRepo),
    }
}

export { CreateWorkerCommand } from './application/commands/create-worker.command'
export { UpdateWorkerCommand } from './application/commands/update-worker.command'
export { DeleteWorkerCommand } from './application/commands/delete-worker.command'
export { ListWorkersQuery } from './application/queries/list-workers.query'
export { GetWorkerByUserIDQuery } from './application/queries/get-worker-by-userID.query'
export { GetWorkerByIDQuery } from './application/queries/get-worker-by-id.query'
