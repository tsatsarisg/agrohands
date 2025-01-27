import { Request, Response, NextFunction } from 'express'
import { ObjectSchema, ValidationResult } from 'joi'

function validateBody(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation: ValidationResult = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: true,
        })

        if (validation.error) {
            res.status(400).json({
                error: 'Validation error',
                details: validation.error.details.map((err) => err.message),
            })
            return
        }

        req.body = validation.value

        next()
    }
}

export default validateBody
