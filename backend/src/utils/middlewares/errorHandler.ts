import { NextFunction, Request, Response } from 'express'

const errorHandler = (
    err: Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        const message = err.message
        return res.status(500).json({ message })
    }

    next()
}

export default errorHandler
