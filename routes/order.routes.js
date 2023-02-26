const Router = require("@koa/router");
const schemaValidate = require("../utils/schema.validation");
const orderSchema = require("../utils/interfaces/order.interface");
const orderController = require("../controllers/order.controller");
const router = new Router();

router.post(
    "/",
    schemaValidate(orderSchema.createOrderSchema),
    orderController.createOrder
);
router.get(
    "/:id",
    schemaValidate(orderSchema.orderDetailSchema),
    orderController.fetchOrderDetails
);

router.get(
    "/user/:id",
    schemaValidate(orderSchema.userOrdersListSchema),
    orderController.fetchAllOrders
);

router.get(
    "/",
    schemaValidate(orderSchema.ordersListSchema),
    orderController.fetchAllOrders
);

router.patch(
    "/:id",
    schemaValidate(orderSchema.editOrderSchema),
    orderController.updateOrderDetail
);
//only available to admin
router.patch(
    "/change-payment-status/:id",
    schemaValidate(orderSchema.editOrderPaymentStatusSchema),
    orderController.updateOrderDetail
);
module.exports = router.routes();
