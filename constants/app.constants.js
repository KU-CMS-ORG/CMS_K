const ROLES = {
    admin: "admin",
    "super-admin": "super-admin",
    user: "super-admin",
};
const FACULTY = { ai: "AI" };
const PAYMENT_TYPES = ["cash", "esewa"];
const USER_STATUS = {
    active: "active",
    closed: "closed",
    inactive: "inactive",
};
const FOOD_CATEGORY = ["breakfast", "lunch", "dinner", "beverages", "others"];
const PAYMENT_STATUS = ["pending", "paid"];

const ALLOWED_ORDERBY = ["asc", "desc"];

module.exports = {
    ROLES,
    USER_STATUS,
    PAYMENT_STATUS,
    FOOD_CATEGORY,
    PAYMENT_TYPES,
    FACULTY,
    ALLOWED_ORDERBY,
};
