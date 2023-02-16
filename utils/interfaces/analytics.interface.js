const { Days } = require("@prisma/client");
const Joi = require("joi");

const totalTransactionSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: Joi.object().keys({
        fromDate: Joi.string().optional(),
        toDate: Joi.string().optional(),
    }),
    body: {},
};
const totalTransactionByMonthSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),

    body: {},
};
module.exports = {
    totalTransactionSchema,
    totalTransactionByMonthSchema,
};
