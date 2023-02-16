import Koa from "koa";
import { koaBody } from "koa-body";
import rootRouter from "@routes/index.route";
import DB from "@cms/db";
import { changePasswordSchema } from "@utils/interfaces/auth.interface";
import schemaValidate from "@utils/schema.validation";
import Debug from "debug";
import config from "@utils/config";
const debug = Debug("server");
DB();

//Route files
const app = new Koa();
const PORT = config.port;
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        const err = e as { statusCode: number; message: string };
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
    schemaValidate(changePasswordSchema as any, {
        oldPassword: "134",
        newPassword: "123",
    })
);

app.listen(PORT, () => {
    debug("Server running at: http://localhost:" + PORT);
});
