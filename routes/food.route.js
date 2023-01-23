const Router = require("@koa/router");
const {
    signup,
    signin,
    changePassword,
    forgotPassword,
} = require("../controllers/food.controller");

const router = new Router();

router.get("/:id", signin);
router.get("/", signup);
router.post("/", changePassword);
router.patch("/:id", forgotPassword);
router.delete("/:id", signin);

module.exports = router.routes();
