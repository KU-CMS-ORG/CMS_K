const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function getTotalTransaction(ctx) {
    const userId = ctx.params.id;

    // Assuming you have a database with a `transactions` table
    const transactions = await prisma.query(
        "SELECT * FROM tblTranHistory WHERE userId = ?",
        [userId]
    );

    // Sum up the transaction amounts
    const total = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    ctx.body = { total };
}
module.exports = { getTotalTransaction };
