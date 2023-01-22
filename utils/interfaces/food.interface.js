const { FoodCategory } = require("@prisma/client");
const Joi = require("joi");

const foodDetailSchema = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    query: {},
    body: {},
};

const foodsListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0).required(),
        page: Joi.number().required().min(1).required(),
        search: Joi.string().optional(),
    }),
    body: {},
};

const editFoodSchema = {
    params: Joi.object()
        .keys({
            id: Joi.number().required(),
        })
        .required(),
    query: {},
    body: Joi.object().keys({
        foodName: Joi.string().optional(),
        desc: Joi.string().optional(),
        price: Joi.number().optional(),
        quantity: Joi.number().optional(),
        foodCategory: Joi.string()
            .valid(
                FoodCategory.BEVERAGE,
                FoodCategory.LUNCH,
                FoodCategory.MEAL,
                FoodCategory.OTHER
            )
            .optional(),
    }),
};

const createFoodSchema = {
    params: {},
    query: {},
    body: Joi.object().keys({
        foodName: Joi.string().required(),
        desc: Joi.string().optional(),
        price: Joi.number().required(),
        quantity: Joi.number().optional(),
        foodCategory: Joi.string()
            .valid(
                FoodCategory.BEVERAGE,
                FoodCategory.LUNCH,
                FoodCategory.MEAL,
                FoodCategory.OTHER
            )
            .required(),
    }),
};

module.exports = {
    createFoodSchema,
    editFoodSchema,
    foodsListSchema,
    foodDetailSchema,
};
