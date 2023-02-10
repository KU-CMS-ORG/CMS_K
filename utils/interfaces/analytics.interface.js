const { Days } = require("@prisma/client");
const Joi = require("joi");

const totalTransactionSchema = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    query: {},
    body: {},
};
module.exports = {
    totalTransactionSchema,
};
