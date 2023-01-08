const Router = require("@koa/router");
const router = new Router();

const {
	register,
	getUsers,
	getUser,
	updateUser,
} = require("../controllers/user");

router.post("/register", register);
router.get("/users", getUsers);
router.get("/me", getUser);
router.put("./updateUser", updateUser);

module.exports = router;
