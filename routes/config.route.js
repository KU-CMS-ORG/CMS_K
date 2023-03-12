// things like food category, roles list, and other app default values are sent from here, all get apis
// basically all app configurations
const Router = require("@koa/router");
const configController = require("../controllers/config.controller");
const router = new Router();

router.get("/roles", configController.fetchAppRoles);
router.get("/payment-methods", configController.fetchAppRoles);
router.get("/transaction-statuses", configController.fetchTransactionStatuses);
router.get("/food-categories", configController.fetchFoodCategories);
router.get("/payment-statuses", configController.fetchPaymentStatuses);
router.get("/faculties", configController.fetchFaculties);

module.exports = router.routes();
