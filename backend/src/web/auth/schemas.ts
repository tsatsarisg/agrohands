import Joi from 'joi'

export type SignUpBody = {
    fullName: string
    email: string
    password: string
}

export const signupSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export type LoginBody = {
    email: string
    password: string
}

export const loginSchema = Joi.object<LoginBody>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export type ChangePasswordBody = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}

export const changePasswordSchema = Joi.object<ChangePasswordBody>({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().required(),
})
