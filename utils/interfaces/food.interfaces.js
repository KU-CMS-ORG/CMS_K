const Joi = require("joi");

const foodDetailSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: {},
    body: {},
};

const foodListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0),
        page: Joi.number().required().min(1),
        sortBy: Joi.allow(["foodName", "price"]),
        search: Joi.string(),
    }),
    body: {},
};

const editFoodSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: {},
    body: Joi.object().keys({
        foodName: Joi.string().optional(),
        foodCategory: Joi.string().optional(),
        price: Joi.Decimal().optional(),
        desc: Joi.string().email().optional(),
        quantity: Joi.number().optional(),
    }),
};

module.exports = { foodDetailSchema, foodListSchema, editFoodSchema };
