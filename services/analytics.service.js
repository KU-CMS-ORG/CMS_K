const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function getTotalTransaction(ctx) {
    const total = await prisma.tblTranHistory.aggregate({
        _sum: {
            checkoutPrice: true,
        },
    });
    return { totalPrice: total._sum.checkoutPrice };
}
module.exports = { getTotalTransaction };
