const { FoodCategory } = require("@prisma/client");
const Joi = require("joi");

const foodDetailSchema = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    query: {},
    body: {},
};
const allowedSort = [
    "foodId:asc",
    "foodId:desc",
    "foodName:asc",
    "foodName:desc",
    "foodCategory:asc",
    "foodCategory:desc",
    "price:asc",
    "price:desc",
    "desc:asc",
    "desc:desc",
    "quantity:asc",
    "quantity:desc",
    "createdAt:asc",
    "createdAt:desc",
    "updatedAt:asc",
    "updatedAt:desc",
    "menu:asc",
    "menu:desc",
    "tranHistory:asc",
    "tranHistory:desc",
];
const foodsListSchema = {
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
