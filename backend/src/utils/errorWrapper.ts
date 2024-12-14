import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCallback = (callback: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default handleCallback
