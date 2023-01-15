const Joi = require("joi");

const userDetailSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: {},
    body: {},
};

const usersListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0),
        page: Joi.number().required().min(1),
        sortBy: Joi.allow(["firstName", "lastName"]),
        search: Joi.string(),
    }),
    body: {},
};

const editUserSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: {},
    body: Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        middleName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.number().optional(),
        role: Joi.allow(["staff", "user"]).optional(),
        department: Joi.allow(["staff", "student", "teacher"]).optional(),
    }),
};

module.exports = { userDetailSchema, usersListSchema, editUserSchema };
