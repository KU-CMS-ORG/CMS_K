const Joi = require("joi");

const signInSchema = {
    params: {},
    query: {},
    body: Joi.object().keys({
        credential: Joi.any().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

const signUpSchema = {
    params: {},
    query: {},
    body: Joi.object()
        .keys({
            credential: Joi.any().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        .required(),
};

const forgotPasswordSchema = {
    params: {},
    query: {},
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

const changePasswordSchema = {
    params: {},
    query: {},
    body: Joi.object().keys({
        userId: Joi.string().required().guid(),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    }),
};

module.exports = {
    signInSchema,
    signUpSchema,
    forgotPasswordSchema,
    changePasswordSchema,
};
