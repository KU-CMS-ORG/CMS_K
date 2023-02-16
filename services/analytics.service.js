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
module.exports = { getTotalTransaction };
