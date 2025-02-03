import { err, ok } from 'neverthrow'
import { Request, Response } from 'express'
import WorkerController from './worker.controller'
import {
    CreateWorkerCommand,
    DeleteWorkerCommand,
    GetWorkerByIDQuery,
    GetWorkerByUserIDQuery,
    IWorkerComponent,
    ListWorkersQuery,
    UpdateWorkerCommand,
} from '../../components/worker'
import { CreateWorkerHandler } from '../../components/worker/application/handlers/create-worker.handler'
import { DeleteWorkerByIDHandler } from '../../components/worker/application/handlers/delete-worker.handler'
import { GetWorkerByIDHandler } from '../../components/worker/application/handlers/get-worker-by-id.handler'
import { GetWorkerByUserIDHandler } from '../../components/worker/application/handlers/get-worker-by-userid.handler'
import { ListWorkersHandler } from '../../components/worker/application/handlers/list-workers.handler'
import { UpdateWorkerHandler } from '../../components/worker/application/handlers/update-worker.handler'

describe('WorkerController', () => {
    let controller: WorkerController

    let workerComponent: jest.Mocked<IWorkerComponent>

    beforeEach(() => {
        workerComponent = {
            getWorkerByID: {} as jest.Mocked<GetWorkerByIDHandler>,
            getWorkerByUserID: {} as jest.Mocked<GetWorkerByUserIDHandler>,
            listWorkersHandler: {} as jest.Mocked<ListWorkersHandler>,
            createWorkerHandler: {} as jest.Mocked<CreateWorkerHandler>,
            updateWorkerHandler: {} as jest.Mocked<UpdateWorkerHandler>,
            deleteWorkerHandler: {} as jest.Mocked<DeleteWorkerByIDHandler>,
        }

        controller = new WorkerController(workerComponent)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('get', () => {
        it('should return 400 if no id is provided', async () => {
            workerComponent.getWorkerByID.execute = jest
                .fn()
                .mockResolvedValue(ok({ getDetails: { id: 'user123' } }))
            const req = mockRequest({ email: 'test@test.com' }, 'user123', '')
            const res = mockResponse()

            await controller.get(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                message: 'No id provided.',
            })
        })

        it('should return 200 and worker details if found', async () => {
            workerComponent.getWorkerByID.execute = jest
                .fn()
                .mockResolvedValue(ok({ getDetails: { id: 'user123' } }))
            const req = mockRequest(
                { email: 'test@test.com' },
                'user123',
                'user123'
            )
            const res = mockResponse()

            await controller.get(req, res)

            expect(workerComponent.getWorkerByID.execute).toHaveBeenCalledWith(
                expect.any(GetWorkerByIDQuery)
            )
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                id: 'user123',
            })
        })

        it('should return 404 if worker is not found', async () => {
            workerComponent.getWorkerByID.execute = jest
                .fn()
                .mockResolvedValue(err('Not found'))

            const req = mockRequest({}, 'user123', '213fsda')
            const res = mockResponse()

            await controller.get(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Not found',
            })
        })
    })

    describe('getPersonalWorker', () => {
        it('should return 200 and worker details if found', async () => {
            workerComponent.getWorkerByUserID.execute = jest
                .fn()
                .mockResolvedValue(ok({ getDetails: { id: 'user123' } }))

            const req = mockRequest({}, 'user123')
            const res = mockResponse()

            await controller.getPersonalWorker(req, res)

            expect(
                workerComponent.getWorkerByUserID.execute
            ).toHaveBeenCalledWith(expect.any(GetWorkerByUserIDQuery))
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                id: 'user123',
            })
        })

        it('should return 404 if personal worker is not found', async () => {
            workerComponent.getWorkerByUserID.execute = jest
                .fn()
                .mockResolvedValue(err('Not found'))

            const req = mockRequest({}, 'user123')
            const res = mockResponse()

            await controller.getPersonalWorker(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Not found',
            })
        })
    })

    describe('list', () => {
        it('should return 200 and a list of workers', async () => {
            const mockWorkers = [
                { id: '1', name: 'John Doe' },
                { id: '2', name: 'Jane Doe' },
            ]

            workerComponent.listWorkersHandler.execute = jest
                .fn()
                .mockResolvedValue(mockWorkers)

            const mockRequest = {
                query: { page: '1', limit: '10', searchTerm: 'developer' },
            } as unknown as Request
            const res = mockResponse()

            await controller.list(mockRequest, res)

            expect(
                workerComponent.listWorkersHandler.execute
            ).toHaveBeenCalledWith(expect.any(ListWorkersQuery))
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockWorkers)
        })
    })

    describe('create', () => {
        it('should return 201 and worker ID on successful creation', async () => {
            workerComponent.createWorkerHandler.execute = jest
                .fn()
                .mockResolvedValue(ok('user123'))

            const req = mockRequest(
                {
                    userID: 'user123',
                    body: {
                        description: 'Software Developer',
                        title: 'Engineer',
                        firstName: 'John',
                        lastName: 'Doe',
                        location: 'New York',
                        skills: ['JavaScript', 'Node.js'],
                    },
                },
                'user123',
                'user123'
            )
            const res = mockResponse()

            await controller.create(req, res)

            expect(
                workerComponent.createWorkerHandler.execute
            ).toHaveBeenCalledWith(expect.any(CreateWorkerCommand))
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({
                workerID: 'user123',
            })
        })

        it('should return 400 on creation failure', async () => {
            workerComponent.createWorkerHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Failed'))

            const req = mockRequest({
                userID: 'user123',
                body: {
                    description: 'Software Developer',
                    title: 'Engineer',
                    firstName: 'John',
                    lastName: 'Doe',
                    location: 'New York',
                    skills: ['JavaScript', 'Node.js'],
                },
            })
            const res = mockResponse()

            await controller.create(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Failed',
            })
        })
    })

    describe('update', () => {
        it('should return 400 if no ID is provided', async () => {
            const req = mockRequest({ email: 'test@test.com' }, 'user123', '')
            const res = mockResponse()

            await controller.update(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                message: 'No id provided.',
            })
        })

        it('should return 201 on successful update', async () => {
            workerComponent.updateWorkerHandler.execute = jest
                .fn()
                .mockResolvedValue(ok(undefined))

            const req = mockRequest(
                {
                    userID: 'user123',
                    body: {
                        description: 'Software Developer',
                        title: 'Engineer',
                        firstName: 'John',
                        lastName: 'Doe',
                        location: 'New York',
                        skills: ['JavaScript', 'Node.js'],
                    },
                },
                'user123',
                'user123'
            )
            const res = mockResponse()

            await controller.update(req, res)

            expect(
                workerComponent.updateWorkerHandler.execute
            ).toHaveBeenCalledWith(expect.any(UpdateWorkerCommand))
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({
                message: 'Success',
            })
        })

        it('should return 400 on update failure', async () => {
            workerComponent.updateWorkerHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Failed'))

            const req = mockRequest(
                {
                    userID: 'user123',
                    body: {
                        description: 'Software Developer',
                        title: 'Engineer',
                        firstName: 'John',
                        lastName: 'Doe',
                        location: 'New York',
                        skills: ['JavaScript', 'Node.js'],
                    },
                },
                'user123',
                'user123'
            )
            const res = mockResponse()

            await controller.update(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Failed',
            })
        })
    })

    describe('delete', () => {
        it('should return 400 if no ID is provided', async () => {
            const req = mockRequest({ email: 'test@test.com' }, 'user123', '')
            const res = mockResponse()

            await controller.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                message: 'No id provided.',
            })
        })

        it('should return 200 on successful deletion', async () => {
            workerComponent.deleteWorkerHandler.execute = jest
                .fn()
                .mockResolvedValue(undefined)

            const req = mockRequest(
                { email: 'test@test.com' },
                'user123',
                'user123'
            )
            const res = mockResponse()

            await controller.delete(req, res)

            expect(
                workerComponent.deleteWorkerHandler.execute
            ).toHaveBeenCalledWith(expect.any(DeleteWorkerCommand))
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })
})
const mockRequest = (body: any, userID?: string, paramID?: string): Request =>
    ({
        body,
        userID,
        params: { id: paramID },
    } as unknown as Request)

const mockResponse = () => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}
