const Joi = require("joi");
const Debug = require("debug");
const debug = Debug("schema-validation");
/**
 * validates any api data against schema
 * @param {Joi.ObjectSchema<any>} schema
 * @param {{}} data
 */
function schemaValidate(schema, extraParams) {
    return (ctx, next) => {
        const params = ctx.request.params;
        const body = ctx.request.body;
        const query = ctx.request.query;
        const validBody = {
            ...(params && { params }),
            ...(body && { body }),
            ...(query && { query }),
        };
        const { error, value } = Joi.compile(schema).validate(validBody);
        if (error) {
            debug(error);
            ctx.throw(400, error.details[0].message);
            // throw new Error(error.details[0].message);
        }
        return next();
    };
}

module.exports = schemaValidate;
