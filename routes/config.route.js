// things like food category, roles list, and other app default values are sent from here, all get apis
// basically all app configurations
const Router = require("@koa/router");
const configController = require("../controllers/config.controller");
const router = new Router();

router.get("/roles", configController.fetchAppRoles);
router.get("/payment-methods", configController.fetchAppRoles);
router.get("/transaction-status", configController.fetchTransactionStatuses);
router.get("/food-categories", configController.fetchFoodCategories);
router.get("/payment-status", configController.fetchPaymentStatuses);

module.exports = router.routes();
