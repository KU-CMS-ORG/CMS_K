const authRoute = require("./auth.route");
const Router = require("@koa/router");
const foodRoute = require("./food.route");

const router = new Router();
router.use("/auth", authRoute);
router.use("/food", foodRoute);
module.exports = router.routes();
