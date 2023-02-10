const Router = require("@koa/router");
const schemaValidate = require("../utils/schema.validation");
const totalTransactionSchema = require("../utils/interfaces/analytics.interface");
const analyticsController = require("../controllers/analytics.controller");
const router = new Router();

router.get(
    "/total_trans/:id",
    schemaValidate(totalTransactionSchema.totalTransactionSchema),
    analyticsController.getTotalTransaction
);
module.exports = router.routes();
