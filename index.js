const Koa = require("koa");

const { koaBody } = require("koa-body");

const rootRouter = require("./controllers/user");
const DB = require("./db");
DB();

//Route files
const app = new Koa();
app.use(koaBody());
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.listen(3000, () => {
	console.log("Server running at: http://localhost:3000");
});
