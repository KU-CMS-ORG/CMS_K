const { PrismaClient, Prisma, UserStatus, Role } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 *get detail of user by id or email
 * @param {{userId?:String, email?: String}} whereKey
 * @returns
 */
async function findDetail(whereKey) {
    try {
        // find one user and return it
        return prisma.tblUser.findUnique({
            where: whereKey,
            include: {
                tranHistory: {
                    include: {
                        payment: true,
                    },
                },
            },
        });
    } catch (error) {
        throw error;
    }
}

/**
 * find all users in the system
 * @param {{limit: Number, page: Number, sortBy?: String, sortType?: String}} options
 * @param {{search?:String}} filters
 */
async function findAll(options, filters) {
    try {
        const whereQuery = {
            AND: [
                {
                    OR: [{ role: Role.USER }, { role: Role.ADMIN }],
                },
                filters.search && {
                    OR: [
                        { firstName: { contains: filters.search } },
                        { middleName: { contains: filters.search } },
                        { lastName: { contains: filters.search } },
                        { rollId: { contains: filters.search } },
                    ],
                },
            ],
        };
        const [count, allUsers] = await prisma.$transaction([
            prisma.tblUser.count({
                where: whereQuery,
            }),
            prisma.tblUser.findMany({
                where: whereQuery,
                include: {
                    credential: { select: { email: true, createdAt: true } },
                },
                take: options.limit,
                skip: (options.page - 1) * options.limit,
            }),
        ]);
        return {
            page: options.page,
            limit: options.limit,
            data: allUsers,
            totalData: count || 0,
            totalPages: Math.ceil(count / options.limit),
        };
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
 * @param {{userId: String}} whereKey
 * @param {{firstName?:String, middleName?:String, lastName?:String, email?: String, rollId?:String, phone?:Number, role?: String, faculty?: String, status?: String}} userDetails
 */
async function updateUser(whereKey, userDetails) {
    try {
        const { email, ...rest } = userDetails;
        let credentialUpdate = undefined;
        if (email) {
            credentialUpdate = { credential: { update: { email } } };
        }
        return prisma.tblUser.update({
            where: { ...whereKey },
            data: { ...rest, ...credentialUpdate },
            include: { credential: !!credentialUpdate },
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { findDetail, findAll, updateUser, deleteUser };
