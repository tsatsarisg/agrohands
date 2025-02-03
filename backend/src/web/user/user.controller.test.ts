import { err, ok } from 'neverthrow'
import { GetUserEmailQuery, IUserComponent } from '../../components/user'
import { GetUserEmailHandler } from '../../components/user/application/handlers/get-user-email.handler'
import { UpdateUserEmailHandler } from '../../components/user/application/handlers/update-email.handler'
import { UserController } from './user.controller'
import { Request, Response } from 'express'
import { UpdateUserEmailCommand } from '../../components/user/application/commands/update-email.command'

const mockRequest = (body: any, userID?: string): Request =>
    ({
        body,
        userID,
    } as unknown as Request)

const mockResponse = () => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe('UserController', () => {
    let controller: UserController

    let userComponent: jest.Mocked<IUserComponent>

    beforeEach(() => {
        userComponent = {
            getUserHandler: {} as jest.Mocked<GetUserEmailHandler>,
            updateUserEmailHandler: {} as jest.Mocked<UpdateUserEmailHandler>,
        }

        controller = new UserController(userComponent)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('findUser', () => {
        it('should return 200 and user id on successful signup', async () => {
            userComponent.getUserHandler.execute = jest
                .fn()
                .mockResolvedValue(ok({ getDetails: { id: 'user123' } }))

            const req = mockRequest({}, 'user123')
            const res = mockResponse()

            await controller.findUser(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ id: 'user123' })
            expect(userComponent.getUserHandler.execute).toHaveBeenCalledWith(
                expect.any(GetUserEmailQuery)
            )
        })

        it('should return 404 and error message on failed signup', async () => {
            userComponent.getUserHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Not found'))

            const req = mockRequest({}, 'testUserId')
            const res = mockResponse()

            await controller.findUser(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Not found',
            })
        })
    })

    describe('updateEmail', () => {
        it('should return 200 and user id on successful signup', async () => {
            userComponent.updateUserEmailHandler.execute = jest
                .fn()
                .mockResolvedValue(ok({ getDetails: { id: 'user123' } }))

            const req = mockRequest({ email: 'test@test.com' }, 'user123')
            const res = mockResponse()

            await controller.updateEmail(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'Success' })
            expect(
                userComponent.updateUserEmailHandler.execute
            ).toHaveBeenCalledWith(expect.any(UpdateUserEmailCommand))
        })

        it('should return 404 and error message on failed signup', async () => {
            userComponent.updateUserEmailHandler.execute = jest
                .fn()
                .mockResolvedValue(err('Not found'))

            const req = mockRequest({ email: 'test@test' }, 'testUserId')
            const res = mockResponse()

            await controller.updateEmail(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error: 'Not found',
            })
        })
    })
})
