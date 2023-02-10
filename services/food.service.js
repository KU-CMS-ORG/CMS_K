const { PrismaClient, Prisma, UserStatus, Role } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * gets food detail by id
 * @param {{foodId: Number}} whereKey
 * @returns food detail if found
 */
async function findDetail(whereKey) {
    try {
        return prisma.tblFood.findUnique({
            where: whereKey,
        });
    } catch (error) {
        throw error;
    }
}

/**
 * find all foods in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
    try {
        const whereQuery = {
            AND: [
                filters.search && {
                    OR: [
                        { foodName: { contains: filters.search } },
                        { desc: { contains: filters.search } },
                    ],
                },
            ],
        };
        const [count, allFoods] = await prisma.$transaction([
            prisma.tblFood.count({
                where: whereQuery,
            }),
            prisma.tblFood.findMany({
                where: whereQuery,
                take: options.limit,
                skip: (options.page - 1) * options.limit,
            }),
        ]);
        return {
            page: options.page,
            limit: options.limit,
            data: allFoods,
            totalData: count || 0,
            totalPages: Math.ceil(count / options.limit),
        };
    } catch (error) {
        throw error;
    }
}

/**
 * updates food item by id
 * @param {{foodId: Number}} whereKey
 * @param {{foodName?: String, quantity?: Number, price?: Number, desc?: String, foodCategory?: String}} foodDetails
 * @returns
 */
async function updateFood(whereKey, foodDetails) {
    try {
        return prisma.tblFood.update({
            where: { ...whereKey },
            data: { ...foodDetails },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * creates new food item
 * @param {{foodName: String, quantity?: Number, price: Number, desc?: String, foodCategory: String}} foodDetails
 * @returns
 */
async function create(foodDetails) {
    try {
        return prisma.tblFood.create({
            data: { ...foodDetails },
        });
    } catch (error) {
        throw error;
    }
}

async function deleteFoodDetail(whereKey) {
    try {
        return prisma.tblFood.delete({
            where: whereKey,
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { findDetail, findAll, updateFood, create, deleteFoodDetail };
