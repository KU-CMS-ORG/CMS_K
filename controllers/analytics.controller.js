const { compareAsc, parseISO } = require("date-fns");
const analyticsService = require("../services/analytics.service");
const { areDatesEqual } = require("../utils/helpers");

/**
 * fetch list of all the menus available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function getTotalTransaction(ctx, next) {
    try {
        const {} = ctx.request.query;
        const response = await analyticsService.getTotalTransaction();
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getTotalTransaction,
};
