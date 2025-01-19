import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { getEnv } from '../../utils/env'

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next()
        return
    }

    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: 'Access token missing or invalid' })
        return
    }

    try {
        const { userID } = verify(token, getEnv('JWT_SECRET')) as {
            userID: string
        }
        req.userID = userID
        next()
        return
    } catch (err) {
        res.status(403).json({ message: 'Token is invalid or expired' })
        return
    }
}

export default authenticateJWT
