const Router = require("@koa/router");
const { signup, signin, changePassword, forgotPassword } = require("../controllers/auth.controller");

const router = new Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);

module.exports= router.routes();