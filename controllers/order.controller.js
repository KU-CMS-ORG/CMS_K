const orderService = require("../services/order.service");

/**
 * fetches all orders given the query
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllOrders(ctx, next) {
    try {
        const { limit, page, search } = ctx.request.query;
        const response = await orderService.findAll(
            { limit: +limit, page: +page },
            { ...(search && { search }) }
        );
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

async function fetchOrderDetails(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const response = await orderService.findDetail({ tranId: +id });
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

async function createOrder(ctx, next) {
    try {
        const createDetails = ctx.request.body;
        console.log(createDetails);
        await orderService.create({
            ...createDetails,
        });
        return (ctx.body = "Order details created successfully");
    } catch (error) {
        throw error;
    }
}

/**
 * updates the order status of any given order
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateOrderDetail(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const updateDetails = ctx.request.body;
        console.log(updateDetails);
        await orderService.update(
            { tranId: +id },
            {
                ...updateDetails,
            }
        );
        return (ctx.body = "Order details updated successfully");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllOrders,
    fetchOrderDetails,
    createOrder,
    updateOrderDetail,
};
