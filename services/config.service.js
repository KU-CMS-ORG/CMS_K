const {
    FoodCategory,
    Role,
    PaymentStatus,
    PaymentMethod,
    TranStatus,
    Faculty,
} = require("@prisma/client");

function fetchFoodCategories() {
    return Object.keys(FoodCategory).map((eachKey) => ({
        label: eachKey,
        value: FoodCategory[eachKey],
    }));
}

function fetchRoles() {
    return Object.keys(Role)
        .filter((eachKey) => eachKey !== Role.SUPERADMIN)
        .map((eachKey) => ({ label: eachKey, value: Role[eachKey] }));
}

function fetchPaymentStatus() {
    return Object.keys(PaymentStatus).map((eachKey) => ({
        label: eachKey,
        value: PaymentStatus[eachKey],
    }));
}

function fetchPaymentMethod() {
    return Object.keys(PaymentMethod).map((eachKey) => ({
        label: eachKey,
        value: PaymentMethod[eachKey],
    }));
}

function fetchTransactionStatus() {
    return Object.keys(TranStatus).map((eachKey) => ({
        label: eachKey,
        value: TranStatus[eachKey],
    }));
}

function fetchFaculties() {
    return Object.keys(Faculty).map((eachKey) => ({
        label: eachKey,
        value: Faculty[eachKey],
    }));
}

module.exports = {
    fetchFoodCategories,
    fetchPaymentMethod,
    fetchPaymentStatus,
    fetchRoles,
    fetchTransactionStatus,
    fetchFaculties,
};
