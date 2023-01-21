const configService = require("../services/config.service");
function fetchAppRoles(ctx, next) {
    return (ctx.body = configService.fetchRoles());
}

function fetchPaymentStatuses(ctx, next) {
    return (ctx.body = configService.fetchPaymentStatus());
}

function fetchFoodCategories(ctx, next) {
    return (ctx.body = configService.fetchFoodCategories());
}

function fetchTransactionStatuses(ctx, next) {
    return (ctx.body = configService.fetchTransactionStatus());
}

function fetchPaymentMethods(ctx, next) {
    return (ctx.body = configService.fetchPaymentMethod());
}

module.exports = {
    fetchAppRoles,
    fetchPaymentStatuses,
    fetchFoodCategories,
    fetchTransactionStatuses,
    fetchPaymentMethods,
};
