const { FoodCategory, Days } = require("@prisma/client");
const Joi = require("joi");

const menuDetailSchema = {
    params: Joi.object().keys({
        id: Joi.alternatives().try(Joi.number(), Joi.date()).required(),
    }),
    query: {},
    body: {},
};
const allowedSort = [
    "createdAt:asc",
    "createdAt:desc",
    "createdAtDay:asc",
    "createdAtDay:desc",
    "menuFor:asc",
    "menuFor:desc",
    "foods:asc",
    "foods:desc",
];

const menusListSchema = {
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

const editMenuSchema = {
    params: Joi.object()
        .keys({
            id: Joi.number().required(), // if menu's menufor is not greater than today, you cannot edit
        })
        .required(),
    query: {},
    body: Joi.object()
        .keys({
            menuFor: Joi.date().optional().min("now"),
            foods: Joi.array()
                .items(
                    Joi.object().keys({
                        foodId: Joi.number().min(0).required(),
                    })
                )
                .optional(),
        })
        .required(),
};

const createMenuSchema = {
    params: {},
    query: {},
    body: Joi.object()
        .keys({
            menuFor: Joi.date().required().min("now"),
            foods: Joi.array()
                .items(
                    Joi.object().keys({
                        foodId: Joi.number().min(0).required(),
                    })
                )
                .required(),
        })
        .required(),
};

module.exports = {
    createMenuSchema,
    editMenuSchema,
    menusListSchema,
    menuDetailSchema,
};
