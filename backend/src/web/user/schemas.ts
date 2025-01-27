import Joi from 'joi'

export type EmailBody = {
    email: string
}
const updateEmailSchema = Joi.object({
    email: Joi.string().required(),
})

export { updateEmailSchema }
