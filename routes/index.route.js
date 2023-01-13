const authRoute = require("./auth.route");
const Router = require("@koa/router");

const router = new Router();
router.use('/auth', authRoute)

module.exports = router.routes();