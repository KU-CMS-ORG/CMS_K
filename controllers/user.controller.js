const userService = require("../services/user.service");
/**
 * finds and returns all users
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllUsers(ctx, next) {
    try {
        const { limit, page, search } = ctx.request.query;
        const response = await userService.findAll(
            { limit: +limit, page: +page },
            { ...(search && { search }) }
        );
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

async function fetchUserDetail(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const response = await userService.findDetail({ userId: id });
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * updates the user details if they are provided
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateUserDetail(ctx, next) {
    try {
        const updateDetails = ctx.request.body;
        const params = ctx.request.params;
        const {
            firstName,
            middleName,
            lastName,
            email,
            faculty,
            rollId,
            userStatus,
            phone,
        } = updateDetails;
        const updateBody = {
            ...(email && { email }),
            ...(firstName && { firstName }),
            ...(middleName && { middleName }),
            ...(lastName && { lastName }),
            ...(faculty && { faculty }),
            ...(rollId && { rollId }),
            ...(userStatus && { userStatus }),
            ...(phone && { phone, code: 977 }),
        };
        await userService.updateUser({ userId: params.id }, updateBody);
        return (ctx.body = "User details updated successfully");
    } catch (error) {
        throw error;
    }
}

/**
 * updates the role of the user if user id is provided
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function updateRole(ctx, next) {
    try {
        const updateDetails = ctx.request.body;
        const params = ctx.request.params;
        const { role } = updateDetails;
        const updateBody = {
            role,
        };
        await userService.updateUser({ userId: params.id }, updateBody);
        return (ctx.body = "Updated role successfully");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchAllUsers,
    fetchUserDetail,
    updateUserDetail,
    updateRole,
};
