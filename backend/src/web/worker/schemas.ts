import Joi from 'joi'

const createSchema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    skills: Joi.array().required(),
})

const updateSchema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    skills: Joi.array().required(),
})

export { createSchema, updateSchema }
