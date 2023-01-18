const foodService = require("../services/food.service");

/**
 * fetch list of all the foods available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllFoods(ctx, next) {
    try {
        const { limit, page, search } = ctx.request.query;
        const response = await foodService.findAll(
            { limit: +limit, page: +page },
            { ...(search && { search }) }
        );
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * fetches details of a given specific food
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchFoodDetails(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const response = await foodService.findDetail({ foodId: +id });
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * creates a new food item
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function createFood(ctx, next) {
    try {
        const createDetails = ctx.request.body;
        await foodService.create(createDetails);
        return (ctx.body = "Food details created successfully");
    } catch (error) {
        throw error;
    }
}

/**
 * updates an existing food detail
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateFoodDetail(ctx, next) {
    try {
        const updateDetails = ctx.request.body;
        const params = ctx.request.params;
        const { foodName, foodCategory, price, desc, quantity } = updateDetails;
        const updateBody = {
            ...(foodName && { foodName }),
            ...(foodCategory && { foodCategory }),
            ...(price && { price }),
            ...(desc && { desc }),
            ...(quantity && { quantity }),
        };
        await foodService.updateFood({ foodId: +params.id }, updateBody);
        return (ctx.body = "Food details updated successfully");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllFoods,
    fetchFoodDetails,
    createFood,
    updateFoodDetail,
};
