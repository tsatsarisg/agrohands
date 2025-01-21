import Joi from 'joi'

const updateEmailSchema = Joi.object({
    email: Joi.string().required(),
})

export { updateEmailSchema }
