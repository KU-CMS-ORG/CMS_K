// menu will be created automatically with cronjob everyday, you just have to set is available to true or false
// and update the menu.
// one menu will have multiple food items on the list
// once the day ends and new menu is created, prev one auto sets to inactive
// old menu cannot be set to active
// new menu can be created for tomorrow but won't be set to active until tomorrow

const {
    PrismaClient,
    Prisma,
    UserStatus,
    Role,
    Days,
} = require("@prisma/client");
const { compareAsc, format } = require("date-fns");
const { getCreatedAtDay } = require("../utils/helpers");
const prisma = new PrismaClient();

/**
 * gets menu detail by id
 * @param {{menuId: Number}} whereKey
 * @returns food detail if found
 */
async function findDetail(whereKey) {
    try {
        return prisma.tblMenu.findUnique({
            where: whereKey,
            include: {
                foods: {
                    select: {
                        food: true,
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * find all menu in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
    try {
        const whereQuery = {};
        const [count, allMenus] = await prisma.$transaction([
            prisma.tblMenu.count({
                where: whereQuery,
            }),
            prisma.tblMenu.findMany({
                where: whereQuery,
                include: {
                    foods: {
                        include: {
                            food: true,
                        },
                    },
                },
                take: options.limit,
                skip: (options.page - 1) * options.limit,
            }),
        ]);
        return {
            page: options.page,
            limit: options.limit,
            data: allMenus,
            totalData: count || 0,
            totalPages: Math.ceil(count / options.limit),
        };
    } catch (error) {
        throw error;
    }
}

/**
 * updates menu item by id
 * @param {{menuId: Number}} whereKey
 * @param {{foodName?: String, quantity?: Number, price?: Number, desc?: String, foodCategory?: String}} menuDetails
 * @returns
 */
async function updateMenu(whereKey, foodDetails) {
    try {
        // for food in menu, delete everything and reinsert
        return prisma.tblMenu.update({
            where: { ...whereKey },
            data: { ...foodDetails },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * creates new food item
 * @param {{menuFor: Date, food: [{foodId:String}]}} menuDetails
 * @returns
 */
async function create(menuDetails) {
    try {
        const createdAtDay = getCreatedAtDay(
            format(new Date(menuDetails.menuFor), "EEEE")
        );
        const { foods, ...rest } = menuDetails;
        return prisma.tblMenu.create({
            data: {
                ...rest,
                createdAtDay,
                foods: {
                    create: [...foods],
                },
            },
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { findDetail, findAll, updateMenu, create };
