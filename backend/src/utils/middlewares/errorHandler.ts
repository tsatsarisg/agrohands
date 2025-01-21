import { NextFunction, Request, Response } from 'express'

const errorHandler = (
    err: Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        const message = err.message
        res.status(500).json({ message })
        return
    }

    next()
}

export default errorHandler
