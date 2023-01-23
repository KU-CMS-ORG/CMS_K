const Router = require("@koa/router");
const router = new Router();

const uploadFile = require("../utils/fileUpload");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Get all foods API

router.get("/food", async (ctx, next) => {
    try {
        const foods = await prisma.tblFood.findMany();
        ctx.response.status = 200;

        ctx.body = {
            message: "foods list",
            data: foods,
        };
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
//GET one food API
router.get("/food/:id", async (ctx, next) => {
    try {
        const food = await prisma.tblFood.findUnique({
            where: { foodId: String(ctx.params.id) },
        });
        if (food) {
            ctx.response.status = 200;
            ctx.body = {
                message: "food retrieved",

                data: food,
            };
        }
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
router.post("/upload", async (ctx) => {
    const file = ctx.request.files.file;
    const { key, url } = await uploadFile({
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
    });
    ctx.body = { key, url };
});
//Create New food API
router.post("/food", async (ctx, next) => {
    try {
        const newfood = await prisma.tblfood.createMany({
            data: {
                foodId: ctx.request.body.foodId,
                foodName: ctx.request.body.foodName,
                foodCategory: ctx.request.body.foodCategory,
                price: ctx.request.body.price,
                desc: ctx.request.body.desc,
                quantity: ctx.request.body.quantity,
            },
        });
        if (food) {
            ctx.response.status = 201;

            ctx.body = {
                message: "New food created",

                data: newfood,
            };
        }

        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});

router.put("/food/:id", async (ctx, next) => {
    try {
        const food = await prisma.tblfood.update({
            where: { foodId: String(ctx.params.id) },
            data: {
                foodId: ctx.request.body.foodId,
                foodName: ctx.request.body.foodName,
                foodCategory: ctx.request.body.foodCategory,
                price: ctx.request.body.price,
                desc: ctx.request.body.desc,
                quantity: ctx.request.body.quantity,
            },
        });
        if (food) {
            ctx.response.status = 201;

            ctx.body = {
                message: "food updated",

                data: food,
            };
        }

        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
router.delete("/food/:id", async (ctx, next) => {
    try {
        await prisma.tblfood.delete({
            where: { foodId: String(ctx.params.id) },
        });
        ctx.response.status = 200;
        ctx.body = { message: "food Deleted" };
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
module.exports = router;
