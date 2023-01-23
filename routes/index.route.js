const authRoute = require("./auth.route");
const Router = require("@koa/router");
const foodRoute = require("./food.route");
const userRoute = require("./user.route");
const menuRoute = require("./menu.route");
const orderRoutes = require("./order.routes");
const configRoutes = require("./config.route");

const router = new Router();
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/food", foodRoute);
router.use("/menu", menuRoute);
router.use("/order", orderRoutes);
router.use("/config", configRoutes);
module.exports = router.routes();
