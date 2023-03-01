const { Faculty, UserStatus, Role } = require("@prisma/client");
const Joi = require("joi");
const { ALLOWED_ORDERBY } = require("../../constants/app.constants");

const userDetailSchema = {
    params: Joi.object().keys({
        id: Joi.string().required().guid(),
    }),
    query: {},
    body: {},
};

const allowedSort = [
    "createdAt:asc",
    "createdAt:desc",
    "rollId:asc",
    "rollId:desc",
    "faculty:asc",
    "faculty:desc",
    "userStatus:asc",
    "userStatus:desc",
    "role:asc",
    "role:desc",
];
const usersListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0).required(),
        page: Joi.number().required().min(1).required(),
        search: Joi.string().optional(),
        sort: Joi.alternatives().try(
            Joi.array().items(Joi.string().valid(...allowedSort)),
            Joi.string().valid(...allowedSort)
        ),
    }),
    body: {},
};

const editUserSchema = {
    params: Joi.object()
        .keys({
            id: Joi.string().required().guid(),
        })
        .required(),
    query: {},
    body: Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        middleName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        rollId: Joi.string().optional(),
        userStatus: Joi.string()
            .valid(UserStatus.ACTIVE, UserStatus.CLOSED, UserStatus.INACTIVE)
            .optional(),
        faculty: Joi.string()
            .valid(Faculty.ADMINISTRATION, Faculty.AGRICULTURE, Faculty.AI)
            .optional(),
    }),
};

const editUserRoleSchema = {
    params: Joi.object()
        .keys({
            id: Joi.string().required().guid(),
        })
        .required(),
    query: {},
    body: Joi.object()
        .keys({
            role: Joi.string().valid(Role.ADMIN, Role.USER).required(),
        })
        .required(),
};

module.exports = {
    userDetailSchema,
    usersListSchema,
    editUserSchema,
    editUserRoleSchema,
};
