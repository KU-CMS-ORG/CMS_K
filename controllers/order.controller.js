const orderService = require("../services/order.service");
const Debug = require("debug");
const debug = Debug("order-controller");
/**
 * fetches all orders given the query
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllOrders(ctx, next) {
    try {
        const { limit, page, search } = ctx.request.query;
        const { id } = ctx.request.params;
        const response = await orderService.findAll(
            { limit: +limit, page: +page },
            { ...(search && { search }), ...(id && { userId: id }) }
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
        debug(createDetails);
        await orderService.create({
            ...createDetails,
        });
        return (ctx.body = JSON.stringify(
            "Order details created successfully"
        ));
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
        debug(updateDetails);
        await orderService.update(
            { tranId: +id },
            {
                ...updateDetails,
            }
        );
        return (ctx.body = JSON.stringify(
            "Order details updated successfully"
        ));
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
