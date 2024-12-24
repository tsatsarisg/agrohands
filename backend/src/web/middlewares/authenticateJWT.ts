import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { getEnv } from '../../utils/env'

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') return next()

    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access token missing or invalid' })
    }

    try {
        const { userID } = verify(token, getEnv('JWT_SECRET')) as {
            userID: string
        }
        req.userId = userID
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Token is invalid or expired' })
    }
}

export default authenticateJWT
