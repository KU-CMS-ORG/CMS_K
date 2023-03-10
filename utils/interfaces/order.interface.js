const { TranStatus, PaymentMethod, PaymentStatus } = require("@prisma/client");
const Joi = require("joi");

const orderDetailSchema = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
    query: {},
    body: {},
};

const ordersListSchema = {
    params: {},
    query: Joi.object().keys({
        limit: Joi.number().required().min(0).required(),
        page: Joi.number().required().min(1).required(),
        search: Joi.string().optional(),
    }),
    body: {},
};

const createOrderSchema = {
    params: {},
    query: {},
    body: Joi.object()
        .keys({
            userId: Joi.string().required().guid(),
            foodId: Joi.number().min(0).required(),
            tranDesc: Joi.string().optional(),
            quantity: Joi.number().required(),
            checkoutPrice: Joi.number().required(),
            tranStatus: Joi.string()
                .valid(
                    TranStatus.CANCELLED,
                    TranStatus.ORDERED,
                    TranStatus.SERVED
                )
                .required(),
            paymentDetails: Joi.object()
                .keys({
                    paymentMethod: Joi.string()
                        .valid(PaymentMethod.CASH, PaymentMethod.ESEWA)
                        .when("paymentStatus", {
                            is: PaymentStatus.PAID,
                            then: Joi.required(),
                            otherwise: Joi.optional(),
                        }),
                    paymentStatus: Joi.string()
                        .valid(PaymentStatus.PAID, PaymentStatus.PENDING)
                        .required(),
                    referenceId: Joi.string().when("paymentMethod", {
                        is: PaymentMethod.ESEWA,
                        then: Joi.required(),
                        otherwise: Joi.optional(),
                    }),
                })
                .required(),
        })
        .required(),
};

const editOrderSchema = {
    params: Joi.object()
        .keys({
            id: Joi.number().required(),
        })
        .required(),
    query: {},
    body: Joi.object()
        .keys({
            tranDesc: Joi.string().optional(),
            tranStatus: Joi.string()
                .valid(
                    TranStatus.CANCELLED,
                    TranStatus.ORDERED,
                    TranStatus.SERVED
                )
                .optional(),
            paymentDetails: Joi.object()
                .keys({
                    paymentMethod: Joi.string()
                        .valid(PaymentMethod.ESEWA)
                        .when("paymentStatus", {
                            is: PaymentStatus.PAID,
                            then: Joi.required(),
                            otherwise: Joi.optional(),
                        }),
                    paymentStatus: Joi.string()
                        .valid(PaymentStatus.PAID, PaymentStatus.PENDING)
                        .required(),
                    referenceId: Joi.string().when("paymentMethod", {
                        is: PaymentMethod.ESEWA,
                        then: Joi.required(),
                        otherwise: Joi.optional(),
                    }),
                })
                .optional(),
        })
        .required(),
};

const editOrderPaymentStatusSchema = {
    params: Joi.object()
        .keys({
            id: Joi.number().required(),
        })
        .required(),
    query: {},
    body: Joi.object()
        .keys({
            paymentDetails: Joi.object()
                .keys({
                    paymentMethod: Joi.string()
                        .valid(PaymentMethod.CASH)
                        .when("paymentStatus", {
                            is: PaymentStatus.PAID,
                            then: Joi.required(),
                            otherwise: Joi.optional(),
                        }),
                    paymentStatus: Joi.string()
                        .valid(PaymentStatus.PAID, PaymentStatus.PENDING)
                        .required(),
                    referenceId: Joi.string().when("paymentMethod", {
                        is: PaymentMethod.ESEWA,
                        then: Joi.required(),
                        otherwise: Joi.optional(),
                    }),
                })
                .required(),
        })
        .required(),
};

module.exports = {
    createOrderSchema,
    orderDetailSchema,
    ordersListSchema,
    editOrderSchema,
    editOrderPaymentStatusSchema,
};
