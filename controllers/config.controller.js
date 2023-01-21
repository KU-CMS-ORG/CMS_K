const configService = require("../services/config.service");
function fetchAppRoles() {
    return configService.fetchRoles();
}

function fetchPaymentStatuses() {
    return configService.fetchPaymentStatus();
}

function fetchFoodCategories() {
    return configService.fetchFoodCategories();
}

function fetchTransactionStatuses() {
    return configService.fetchTransactionStatus();
}

function fetchPaymentMethods() {
    return configService.fetchPaymentMethod();
}

module.exports = {
    fetchAppRoles,
    fetchPaymentStatuses,
    fetchFoodCategories,
    fetchTransactionStatuses,
    fetchPaymentMethods,
};
