// import { compareAsc, parseISO } from "dat-fns";
// import { analyticsService } from "@services/analytics.service";
// import { areDatesEqual } from "@utils/helpers";
const { compareAsc, parseISO } = require("date-fns");
const analyticsService = require("../services/analytics.service");
const areDatesEqual = require("@utils/helpers");
/**
 *
 * fetch list of all the menus available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function getTotalTransaction(ctx, next) {
    try {
        const { fromDate, toDate } = ctx.request.query;

        const response = await analyticsService.getTotalTransaction({
            fromDate,
            toDate,
        });
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}
async function getTotalTransactionByMonth(ctx, next) {
    try {
        const {} = ctx.request.query;
        const response = await analyticsService.getTotalTransactionByMonth();
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * get analytics by user id
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function getAnalytics(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const response = await analyticsService.getAnalyticsInfo(id);
        ctx.body = response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getTotalTransaction,
    getTotalTransactionByMonth,
    getAnalytics,
};
