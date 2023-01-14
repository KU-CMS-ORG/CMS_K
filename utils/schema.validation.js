const Joi = require("joi");

/**
 * validates any api data against schema
 * @param {Joi.ObjectSchema<any>} schema
 * @param {{}} data
 */
function schemaValidate(schema, data) {
    const { error, value } = schema.validate(data);
    if (error) {
        throw error;
    }

    return value;
}

module.exports = schemaValidate;
