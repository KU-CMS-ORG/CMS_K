const { PrismaClient, PaymentStatus } = require("@prisma/client");
const ApiError = require("@utils/errorHandler");
const { NOT_FOUND } = require("http-status");

const prisma = new PrismaClient();
async function getTotalTransaction({ fromDate, toDate }) {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    console.log({ fromDate, toDate });
    const total = await prisma.tblTranHistory.aggregate({
        where: {
            tranDate:
                fromDate && toDate
                    ? {
                          lte: toDateObj,
                          gte: fromDateObj,
                      }
                    : undefined,
        },
        _sum: {
            checkoutPrice: true,
        },
    });
    return { totalPrice: total._sum.checkoutPrice, fromDate, toDate };
}

// async function getTotalTransactionByMonth(ctx) {
//     const total = await prisma.tblTranHistory.groupBy({
//         select: {
//             tranAtMonth: {
//                 extractMonth: {
//                     tranDate: true,
//                 },
//             },
//         },
//         by: ["extractMonth"],
//         _sum: {
//             checkoutPrice: true,
//         },
//     });
//     return { totalPrice: total._sum.checkoutPrice };
// }

/**
 * get all dashboard analytics
 * @param {String} id
 * @returns
 */
async function getAnalyticsInfo(id) {
    try {
        const userDetails = await prisma.tblUser.findFirst({
            where: { userId: id },
            include: {
                tranHistory: { include: { payment: true, food: true } },
                payment: true,
                credential: { select: { email: true, createdAt: true } },
            },
        });

        if (!userDetails) {
            throw new ApiError({
                message: "User not found",
                statusCode: NOT_FOUND,
            });
        }

        const test = {
            foodCount: {},
            todayCount: 0,
            pendingAmount: 0,
            todaySpent: 0,
            paidAmount: 0,
            totalAmount: 0,
            paidCount: 0,
            pendingCount: 0,
            totalOrders: userDetails.tranHistory.length,
        };
        userDetails.tranHistory.forEach((eachTran) => {
            test.totalAmount += eachTran.quantity * eachTran.checkoutPrice;
            if (test.foodCount[eachTran.food.foodName]) {
                test.foodCount[eachTran.food.foodName] += 1;
            } else {
                test.foodCount[eachTran.food.foodName] = 1;
            }
            if (eachTran.payment.paymentStatus == PaymentStatus.PAID) {
                test.paidCount += 1;
                test.paidAmount += eachTran.quantity * eachTran.checkoutPrice;
            }
            if (eachTran.payment.paymentStatus === PaymentStatus.PENDING) {
                test.pendingCount += 1;
                test.pendingAmount +=
                    eachTran.quantity * eachTran.checkoutPrice;
            }
            if (
                eachTran.createdAt.toLocaleDateString() ==
                new Date().toLocaleDateString()
            ) {
                test.todaySpent += eachTran.quantity * eachTran.checkoutPrice;
                test.todayCount += 1;
            }
        });

        const mostOrdered = Object.keys(test.foodCount).reduce((a, b) =>
            test.foodCount[a] > test.foodCount[b] ? a : b
        );

        return {
            userDetails: {
                fullName: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.credential.email,
                createdAt: userDetails.credential.createdAt,
                status: userDetails.userStatus,
            },
            analytics: [
                { label: "Total Orders", value: `${test.totalOrders}` },
                { label: "Orders Today", value: `${test.todayCount}` },
                { label: "Spent Today", value: `Rs. ${test.todaySpent}` },
                { label: "Total Spent", value: `Rs. ${test.totalAmount}` },
                { label: "Total Pending", value: `Rs. ${test.pendingAmount}` },
                { label: "Total Paid", value: `Rs. ${test.paidAmount}` },
                {
                    label: "Most Ordered",
                    value: `${mostOrdered}(${test.foodCount[mostOrdered]})`,
                },
            ],
        };

        // return userDetails like name, email and from tran history, find all data with pending, paid, total orders,
    } catch (error) {
        throw error;
    }
}
module.exports = { getTotalTransaction, getAnalyticsInfo };
