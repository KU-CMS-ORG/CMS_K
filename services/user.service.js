const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 *
 * @param {{id?:String, email?: String}} where
 * @returns
 */
async function findDetail(whereKey) {
    try {
        // find one user and return it
        return prisma.tblUser.findUnique({
            where: whereKey,
        });
    } catch (error) {
        throw error;
    }
}

/**
 * find all users in the system
 * @param {{limit: Number, page: Number, sortBy: String, sortType: String}} options
 * @param {{email?:String}} filters
 */
async function findAll(options, filters) {
    try {
        return prisma.tblUser.findMany({ take: options.limit });
    } catch (error) {
        throw error;
    }
}

/**
 * deletes user given its id
 * @param {{id: String}} whereKey
 * @returns
 */
async function deleteUser(whereKey) {
    try {
        return prisma.tblUser.delete({ where: { ...whereKey } });
    } catch (error) {
        throw error;
    }
}

/**
 * updates user information
 * @param {{userId: String, firstName?:String, middleName?:String, lastName?:String, email?: String, rollId?:String, phone?:Number, role?: String, faculty?: String, status?: String}} userDetails
 */
async function updateUser(userDetails) {
    try {
        return prisma.tblUser.update({ where: { ...userDetails } });
    } catch (error) {
        throw error;
    }
}

module.exports = { findDetail, findAll, updateUser, deleteUser };
