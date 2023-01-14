const { PrismaClient, Prisma } = require("@prisma/client");
const {
    encryptPassword,
    generatePassword,
    comparePassword,
} = require("../utils/passwordGenerator");
const jwtService = require("./jwt.service");
const emailService = require("./email.service");

const prisma = new PrismaClient();
/**
 * service to create new user
 * @param {{firstName: String, lastName: String, middleName: String, email: String, phone: Number, password: String}} userDetails
 */
async function signup(userDetails) {
    try {
        // add user logic
        const existingUser = await prisma.tblUser.findUnique({
            where: { email: userDetails.email },
        });
        if (existingUser) {
            throw new Error(
                "email already exists. Please try again with a new email address."
            );
        }
        const newUser = await prisma.tblUser.create({
            ...userDetails,
            password: encryptPassword(userDetails.password),
        });
        // create email with new user's credentials
        return newUser;
    } catch (error) {
        throw error;
    }
}

/**
 * login user to the system
 * @param {{email: String, password: String}} userDetails
 * @returns
 */
async function signin(userDetails) {
    try {
        const existingUser = await prisma.tblUser.findUnique({
            where: { email: userDetails.email },
        });
        if (!existingUser) {
            throw new Error("user does not exist");
        }
        if (comparePassword(userDetails.password, existingUser.password)) {
            //generate jwt and login
            return {
                user: existingUser,
                token: jwtService.createToken(existingUser),
            };
        } else {
            throw new Error("password does not match");
        }
    } catch (error) {
        throw error;
    }
}

/**
 * forgot password service, sends email with new password if address exists
 * @param {{email: String}} userDetails
 * @returns
 */
async function forgotPassword(userDetails) {
    try {
        //generate random Password
        const password = generatePassword();
        const updatedUser = await prisma.user.update({
            where: {
                email: userDetails.email,
            },
            data: {
                password,
            },
        });
        // send email with updated password
        emailService.sendForgotPasswordEmail("", "");
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

/**
 * updates new password if old one matches
 * @param {{oldPassword: String, newPassword: String}} userDetails
 * @returns
 */
async function changePassword(userDetails) {
    try {
        const existingUser = await prisma.tblUser.findUnique({
            where: { email: userDetails.email },
        });

        if (!comparePassword(userDetails.password, existingUser.password)) {
            throw new Error("old password does not match");
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: userDetails.email,
            },
            data: {
                password: encryptPassword(userDetails.newPassword),
            },
        });

        return updatedUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { signin, changePassword, signup, forgotPassword };
