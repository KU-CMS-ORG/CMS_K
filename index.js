const Koa = require("koa");

const { koaBody } = require("koa-body");
const rootRouter = require("./routes/index.route");
const DB = require("./db");
const { changePasswordSchema } = require("./utils/interfaces/auth.interface");
const schemaValidate = require("./utils/schema.validation");
const Debug = require("debug");
const debug = Debug("server");
const config = require("./utils/config");
DB();

//Route files
const app = new Koa();
const PORT = config.port;
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || 500;
        ctx.body = err.message;
        ctx.app.emit("error", err, ctx);
    }
});
app.use(koaBody());
app.use(rootRouter);

app.on("error", (err) => {
    debug("An Error has occured... ", err);
});

debug(
    schemaValidate(changePasswordSchema, {
        oldPassword: "134",
        newPassword: "123",
    })
);

app.listen(PORT, () => {
    debug("Server running at: http://localhost:" + PORT);
});
