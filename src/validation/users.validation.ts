import Joi from "joi";

export const usersRegisterValidation = Joi.object().keys({
    first_name: Joi.string().required().max(32),
    last_name: Joi.string().required().max(32),
    username: Joi.string().required().max(32).min(3),
    password: Joi.string().required().max(256).min(6)
})

export const usersLoginValidation = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const userUpdateValidation = Joi.object().keys({
    first_name: Joi.string().max(32),
    last_name: Joi.string().max(32),
    username: Joi.string().max(32),
    password: Joi.string().max(256)
})