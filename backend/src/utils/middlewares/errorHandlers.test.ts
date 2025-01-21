import { Request, Response } from 'express'
import errorHandler from '../../src/utils/middlewares/errorHandler'

describe('errorHandler [middleware]', () => {
    it('should send an error response to the client', () => {
        const req: Request = {} as Request
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response
        const err = new Error('test')
        const next = jest.fn()

        errorHandler(err, req, res, next)

        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    it('should send an internal server error response to the client', () => {
        const req: Request = {} as Request
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response
        const err = new Error()
        const next = jest.fn()

        errorHandler(err, req, res, next)

        expect(res.status).toHaveBeenCalled()
    })

    it('should call next if no error occurs', () => {
        const req: Request = {} as Request
        const res: Response = {} as unknown as Response

        const next = jest.fn()

        errorHandler(undefined, req, res, next)

        expect(next).toHaveBeenCalled()
    })
})
