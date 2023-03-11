const Router = require("@koa/router");
const schemaValidate = require("../utils/schema.validation");
const totalTransactionSchema = require("../utils/interfaces/analytics.interface");
const analyticsController = require("../controllers/analytics.controller");
// import { getTotalTransaction, getTotalTransactionByMonth } from "@services/analytics.service";
// import  Router  from "@koa/router";
// import schemaValidate from "@utils/schema.validation";
// import * as analyticsController from  "@controllers/analytics.controller";

const router = new Router();

router.get(
    "/total_trans/:id",
    schemaValidate(totalTransactionSchema.totalTransactionSchema),
    analyticsController.getTotalTransaction
);

router.get("/analytics/:id", analyticsController.getAnalytics);

module.exports = router.routes();
