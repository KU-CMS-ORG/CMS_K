const Debug = require("debug");
const debug = Debug("db");
(() => {
    const { PrismaClient } = require("@prisma/client");

    const prisma = new PrismaClient();

    async function database() {}

    database()
        .then(async () => {
            await prisma.$disconnect();
        })

        .catch(async (e) => {
            debug(e);

            await prisma.$disconnect();

            process.exit(1);
        });
    module.exports = database;
})();
