const Router = require("@koa/router");
const {
    signup,
    signin,
    changePassword,
    forgotPassword,
} = require("../controllers/auth.controller");
const schemaValidate = require("../utils/schema.validation");
const userSchema = require("../utils/user.interface");

const router = new Router();

router.get("/:id", schemaValidate(userSchema.userDetailSchema), signup);
router.get("/", schemaValidate(userSchema.usersListSchema), signup);
router.post("/", schemaValidate(authSchema.signInSchema), signin);
router.patch("/:id", schemaValidate(userSchema.editUserSchema), changePassword);
router.delete(
    "/:id",
    schemaValidate(userSchema.editUserSchema),
    forgotPassword
);

module.exports = router.routes();
