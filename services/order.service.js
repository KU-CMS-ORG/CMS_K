// only admin can mark as paid if cash is given
// if digital payment, it will auto mark as paid, so all in all only admin or system is allowed to mark as paid
const Debug = require("debug");
const debug = Debug("server");
const { PrismaClient, PaymentStatus } = require("@prisma/client");
const prisma = new PrismaClient();
/**
 *
 * @param {{userId: String, foodId: Number, checkoutPrice: Number, tranDesc?: String, quantity: Int, transStatus: String, paymentDetails?:{paymentMethod?: String, paymentStatus?: String, referenceId?: String}}} transactionDetails
 * @returns
 */
async function create(transactionDetails) {
    // make payment and if payment info then save payment as well
    try {
        const { paymentDetails, ...rest } = transactionDetails;
        debug(paymentDetails);
        return prisma.tblTranHistory.create({
            data: {
                ...rest,
                payment: {
                    create: {
                        userId: transactionDetails.userId,
                        ...(paymentDetails.paymentStatus ===
                            PaymentStatus.PAID && {
                            paymentMethod: paymentDetails.paymentMethod,
                        }),
                        paymentStatus: paymentDetails.paymentStatus,
                        ...(paymentDetails.referenceId && {
                            referenceId: paymentDetails.referenceId,
                        }),
                    },
                },
            },
            include: {
                payment: true,
            },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * find all menu in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
    try {
        const whereQuery = {};
        const [count, allTransactions] = await prisma.$transaction([
            prisma.tblTranHistory.count({
                where: whereQuery,
            }),
            prisma.tblTranHistory.findMany({
                where: whereQuery,
                include: {
                    food: false, // change to true in production
                },
                take: options.limit,
                skip: (options.page - 1) * options.limit,
            }),
        ]);
        return {
            page: options.page,
            limit: options.limit,
            data: allTransactions,
            totalData: count || 0,
            totalPages: Math.ceil(count / options.limit),
        };
    } catch (error) {
        throw error;
    }
}

/**
 *
 * @param {{tranId: number}} whereKey
 * @returns
 */
async function findDetail(whereKey) {
    try {
        return prisma.tblTranHistory.findUnique({
            where: whereKey,
            include: {
                food: true,
                user: true,
            },
        });
    } catch (error) {
        throw error;
    }
}
/**
 *
 * @param {{tranId: Number}} whereKey
 * @param {{tranDesc?: String, transStatus?: String, paymentDetails: {paymentStatus: String, referenceId?: String, paymentMethod?: String}}} orderDetails
 * @returns
 */
async function update(whereKey, orderDetails) {
    // make payment, if payment info then save payment info as well
    // mark as paid, update pending and paid status
    // mark as paid multiple items
    // cancel order, served status
    try {
        const { paymentDetails, ...rest } = orderDetails;
        debug(paymentDetails);
        return prisma.tblTranHistory.update({
            where: whereKey,
            data: {
                ...rest,
                ...(paymentDetails && {
                    payment: {
                        update: {
                            ...(paymentDetails.paymentStatus ===
                                PaymentStatus.PAID && {
                                paymentMethod: paymentDetails.paymentMethod,
                            }),
                            paymentStatus: paymentDetails.paymentStatus,
                            ...(paymentDetails.referenceId && {
                                referenceId: paymentDetails.referenceId,
                            }),
                        },
                    },
                }),
            },
            include: {
                payment: true,
            },
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { create, findDetail, findAll, update };
