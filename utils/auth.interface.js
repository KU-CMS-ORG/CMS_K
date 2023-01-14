const Joi = require("joi");
const schemaValidate = require("./schema.validation");

const signInSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const signUpSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    fName: Joi.string().required(),
    mName: Joi.string().required(),
    lName: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().email().required(),
});

const changePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
});

module.exports = {
    signInSchema,
    signUpSchema,
    forgotPasswordSchema,
    changePasswordSchema,
};
