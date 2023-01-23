const Router = require("@koa/router");
const schemaValidate = require("../utils/schema.validation");
const userSchema = require("../utils/interfaces/user.interface");
const {
    fetchAllUsers,
    fetchUserDetail,
    updateRole,
    updateUserDetail,
} = require("../controllers/user.controller");

const router = new Router();

router.get(
    "/:id",
    schemaValidate(userSchema.userDetailSchema),
    fetchUserDetail
);
router.get("/", schemaValidate(userSchema.usersListSchema), fetchAllUsers);
router.patch(
    "/:id",
    schemaValidate(userSchema.editUserSchema),
    updateUserDetail
);
router.patch(
    "/change-role/:id",
    schemaValidate(userSchema.editUserRoleSchema),
    updateRole
);

module.exports = router.routes();
