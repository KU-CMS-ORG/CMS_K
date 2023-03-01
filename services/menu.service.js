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
const { compareAsc, format, addDays } = require("date-fns");
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
                    include: {
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
 * @param {{limit: Number, page: Number, sort?: []}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
    try {
        console.log(filters.search);
        const whereQuery = {
            ...(filters.search && {
                menuFor: {
                    gte: new Date(filters.search),
                    lt: addDays(new Date(filters.search), 1),
                },
            }),
        };
        const orderBy = options.sort ? options.sort : [{ createdAt: "desc" }];
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
                orderBy,
            }),
        ]);
        return {
            page: options.page,
            limit: options.limit,
            data: allMenus.map((eachMenu) => {
                const { foods, ...rest } = eachMenu;

                return {
                    ...rest,
                    foods: foods.map((eachFood) => {
                        const { food, ...rest } = eachFood;
                        return { ...food, ...rest };
                    }),
                };
            }),
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
 * @param {{foods?: [{foodId:String}], isAvailable?: boolean, menuFor?: Date}} menuDetails
 * @returns
 */
async function updateMenu(whereKey, menuDetails) {
    try {
        // for food in menu, delete everything and reinsert
        const { foods, ...rest } = menuDetails;
        return prisma.tblMenu.update({
            where: { ...whereKey },
            data: {
                ...rest,
                foods: {
                    deleteMany: {},
                    create: [...foods],
                },
            },
            include: {
                foods: true,
            },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * creates new food item
 * @param {{menuFor: Date, foods: [{foodId:String}]}} menuDetails
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
