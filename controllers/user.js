//Get all users API

const Router = require("@koa/router");
const router = new Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
router.get("/", async (ctx, next) => {
    ctx.body = { message: "Hello" };
});

router.get("/users", async (ctx, next) => {
    try {
        const users = await prisma.tblUser.findMany();
        ctx.response.status = 200;

        ctx.body = {
            message: "Users list",
            data: users,
        };
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
//GET one user API
router.get("/users/:id", async (ctx, next) => {
    try {
        const user = await prisma.tblUser.findUnique({
            where: { userId: String(ctx.params.id) },
        });
        if (user) {
            ctx.response.status = 200;
            ctx.body = {
                message: "User retrieved",

                data: user,
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

//Create New User API
router.post("/signup", async (ctx, next) => {
    try {
        const newUser = await prisma.tblUser.createMany({
            data: {
                userId: ctx.request.body.userId,
                fName: ctx.request.body.fName,
                mName: ctx.request.body.mName,
                lName: ctx.request.body.lName,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
                phone: ctx.request.body.phone,
                countryCode: ctx.request.body.countryCode,
                role: ctx.request.body.role,
                faculty: ctx.request.body.faculty,
                userStatus: ctx.request.body.userStatus,
            },
        });
        if (user) {
            ctx.response.status = 201;

            ctx.body = {
                message: "New User created",

                data: newUser,
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

router.put("/user/:id", async (ctx, next) => {
    try {
        const user = await prisma.tblUser.update({
            where: { userId: String(ctx.params.id) },
            data: {
                userId: ctx.request.body.userId,
                fName: ctx.request.body.fName,
                mName: ctx.request.body.mName,
                lName: ctx.request.body.lName,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
                phone: ctx.request.body.phone,
                countryCode: ctx.request.body.countryCode,
                role: ctx.request.body.role,
                faculty: ctx.request.body.faculty,
                userStatus: ctx.request.body.userStatus,
            },
        });
        if (user) {
            ctx.response.status = 201;

            ctx.body = {
                message: "user updated",

                data: user,
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
router.delete("/user/:id", async (ctx, next) => {
    try {
        await prisma.tblUser.delete({
            where: { userId: String(ctx.params.id) },
        });
        ctx.response.status = 200;
        ctx.body = { message: "User Deleted" };
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
});
module.exports = router;
