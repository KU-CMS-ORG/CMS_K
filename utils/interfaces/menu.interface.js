const { FoodCategory, Days } = require("@prisma/client");
const Joi = require("joi");

const menuDetailSchema = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    query: {},
    body: {},
};

const menusListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0).required(),
        page: Joi.number().required().min(1).required(),
        search: Joi.string().optional(),
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
            menuFor: Joi.date().optional().min("now").iso(),
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
            menuFor: Joi.date().required().min("now").iso(),
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
