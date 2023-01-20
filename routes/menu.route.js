const Router = require("@koa/router");
const schemaValidate = require("../utils/schema.validation");
const menuSchema = require("../utils/interfaces/menu.interface");
const menuController = require("../controllers/menu.controller");
const router = new Router();

router.post(
    "/",
    schemaValidate(menuSchema.createMenuSchema),
    menuController.createMenu
);
router.get(
    "/",
    schemaValidate(menuSchema.menusListSchema),
    menuController.fetchAllMenus
);

module.exports = router.routes();
