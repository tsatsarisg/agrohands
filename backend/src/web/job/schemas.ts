import Joi from 'joi'

const createSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
})

export { createSchema }
