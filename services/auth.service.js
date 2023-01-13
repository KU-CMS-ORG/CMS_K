const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
/**
 * service to create new user
 * @param {{}} userDetails 
 */
async function signup(userDetails) {
    try {
        // add user logic
        const existingUser = await prisma.tblUser.findUnique({ where: { email: userDetails.email } });
        if (user) {
            throw new Error('email already exists');
        }
        const newUser = await prisma.tblUser.create({ ...userDetails });
        // create email with new user's credentials
        return newUser;

    } catch (error) {
        throw error;
    }
}

async function signin(userDetails) {
    try {
        const existingUser = await prisma.tblUser.findUnique({ where: { email: userDetails.email } });
        if (!existingUser) {
            throw new Error('user does not exist');
        }
        if (existingUser.password == userDetails.password) {
            //generate jwt and login
            return existingUser;
        } else {
            throw new Error('password does not match');
        }

    } catch (error) {
        throw error;
    }
}

async function forgotPassword(userDetails) {
    try {
        //generate random Password
        const updatedUser = await prisma.user.update({
            where: {
                email: userDetails.email,
            },
            data: {
                password: 'generatedPassword',
            },
        })
        // send email with updated password
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

async function changePassword(userDetails) {
    try {
        const existingUser = await prisma.tblUser.findUnique({ where: { email: userDetails.email } });

        if (userDetails.password !== existingUser.password) {
            throw new Error('old passwords do not match')
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: userDetails.email,
            },
            data: {
                password: userDetails.newPassword,
            },
        })

        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { signin, changePassword, signup, forgotPassword };