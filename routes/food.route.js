const Router = require("@koa/router");
const userController = require("../controllers/food.controller");
const schemaValidate = require("../utils/schema.validation");
const foodSchema = require("../utils/interfaces/food.interface");

const router = new Router();

router.get(
    "/:id",
    schemaValidate(foodSchema.foodDetailSchema),
    userController.fetchFoodDetails
);
router.get(
    "/",
    schemaValidate(foodSchema.foodsListSchema),
    userController.fetchAllFoods
);
router.post(
    "/",
    schemaValidate(foodSchema.createFoodSchema),
    userController.createFood
);
router.patch(
    "/:id",
    schemaValidate(foodSchema.editFoodSchema),
    userController.updateFoodDetail
);
router.delete(
    "/:id",
    schemaValidate(foodSchema.foodDetailSchema),
    userController.deleteFoodDetails
);
module.exports = router.routes();
