const Koa = require("koa");

const { koaBody } = require("koa-body");
const rootRouter = require("./routes/index.route");
const DB = require("./db");
DB();

//Route files
const app = new Koa();
const PORT = 3000;
app.use(koaBody());
app.use(rootRouter);

app.listen(PORT, () => {
	console.log("Server running at: http://localhost:" + PORT);
});
