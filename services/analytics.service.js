const { PrismaClient } = require("@prisma/client");

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

async function getAnalyticsInfo(id) {
    try {
        const userDetails = await prisma.tblUser.findFirst({
            where: { userId: id },
            include: { tranHistory: true },
        });

        // return userDetails like name, email and from tran history, find all data with pending, paid, total orders,
    } catch (error) {
        throw error;
    }
}
module.exports = { getTotalTransaction };
