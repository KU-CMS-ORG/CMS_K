const { compareAsc, parseISO } = require("date-fns");
const menuService = require("../services/menu.service");
const { areDatesEqual } = require("../utils/helpers");

/**
 * fetch list of all the menus available
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchAllMenus(ctx, next) {
    try {
        const { limit, page, search } = ctx.request.query;
        const response = await menuService.findAll(
            { limit: +limit, page: +page },
            { ...(search && { search }) }
        );
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * fetches details of a given specific menu
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function fetchMenuDetails(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const response = await menuService.findDetail({ menuId: +id });
        return (ctx.body = response);
    } catch (error) {
        throw error;
    }
}

/**
 * creates a new menu item
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function createMenu(ctx, next) {
    try {
        const createDetails = ctx.request.body;
        console.log(createDetails);
        await menuService.create({
            ...createDetails,
            menuFor: new Date(createDetails.menuFor),
            isAvailable: areDatesEqual(
                parseISO(createDetails.menuFor),
                new Date()
            ),
        });
        return (ctx.body = "Menu details created successfully");
    } catch (error) {
        throw error;
    }
}

/**
 * updates menu details if id matches
 * @param {*} ctx
 * @param {*} next
 */
async function updateMenuDetail(ctx, next) {
    try {
        const { id } = ctx.request.params;
        const updateDetails = ctx.request.body;
        const { foods, menuFor } = updateDetails;
        await menuService.updateMenu(
            { menuId: +id },
            {
                ...(menuFor && {
                    menuFor: new Date(menuFor),
                    isAvailable: areDatesEqual(parseISO(menuFor), new Date()),
                }),
                ...(foods && { foods }),
            }
        );
        return (ctx.body = "Menu details updated successfully");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createMenu,
    fetchAllMenus,
    fetchMenuDetails,
    updateMenuDetail,
};
