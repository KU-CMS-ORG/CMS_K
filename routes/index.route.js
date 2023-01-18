const authRoute = require("./auth.route");
const Router = require("@koa/router");
const foodRoute = require("./food.route");
const userRoute = require("./user.route");

const router = new Router();
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/food", foodRoute);
module.exports = router.routes();
