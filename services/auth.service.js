const { PrismaClient, Prisma } = require("@prisma/client");
const { OAuth2Client } = require("google-auth-library");
const {
    encryptPassword,
    generatePassword,
    comparePassword,
} = require("../utils/passwordGenerator");
const jwtService = require("./jwt.service");
const emailService = require("./email.service");
const config = require("../utils/config");

const prisma = new PrismaClient();

const googleClientId = config.googleClientId;
const googleClientSecret = config.googleClientSecret;
const client = new OAuth2Client(googleClientId, googleClientSecret);

/**
 * verifies the token with google
 * @param {*} token
 * @returns
 */
async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleClientId,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
}

/**
 * signup user with google authentication
 * @param {*} credentails
 * @returns
 */
async function googleSignup(credentails) {
    try {
        const verificationResponse = await verifyGoogleToken(
            req.body.credential
        );

        if (verificationResponse.error) {
            throw new Error(verificationResponse.error);
        }

        const profile = verificationResponse?.payload;

        console.log(profile);
        const newUser = await prisma.tblUser.create({
            data: {
                fName: profile.given_name,
                lName: profile.given_name,
            },
            tblCredentials: {
                create: [{ email: profile.email }],
            },
            include: {
                tblCrendentials: true,
            },
        });
        // create email with new user's credentials
        return {
            user: newUser,
            token: jwtService.createToken(newUser),
        };
    } catch (error) {
        throw error;
    }
}
/**
 * service to create new user
 * @param {{email: String, password: String}} userDetails
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
            data: {},
            include: { tblCrendentials: true },
            tblCredentials: {
                create: [
                    {
                        password: encryptPassword(userDetails.password),
                        email: userDetails.email,
                    },
                ],
            },
        });
        // create email with new user's credentials
        return {
            user: newUser,
            token: jwtService.createToken(newUser),
        };
    } catch (error) {
        throw error;
    }
}

/**
 * login with google credentails
 * @param {*} credentials
 * @returns
 */
async function googleSignin(credentials) {
    try {
        const verificationResponse = await verifyGoogleToken(credentials);
        if (verificationResponse.error) {
            throw new Error(verificationResponse.error);
        }
        const profile = verificationResponse?.payload;
        const existingUser = await prisma.tblUser.findUnique({
            where: { tblCredentials: { email: profile.email } },
            include: { tblCrendentials: true },
        });
        if (!existingUser) {
            throw new Error("user does not exist");
        }
        return {
            user: existingUser,
            token: jwtService.createToken(existingUser),
        };
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
            where: { tblCredentials: { email: userDetails.email } },
            include: { tblCrendentials: true },
        });
        if (!existingUser) {
            throw new Error("user does not exist");
        }

        if (
            comparePassword(
                userDetails.password,
                existingUser.tblCrendentials.password
            )
        ) {
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
 * forgot password service, changes the password and returns new password
 * @param {{id: String}} userDetails
 * @returns
 */
async function forgotPassword(userDetails) {
    try {
        //generate random Password
        const password = generatePassword();
        const updatedUser = await prisma.user.update({
            where: {
                id: userDetails.id,
            },
            data: {
                password: encryptPassword(password),
            },
        });
        return { password };
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

module.exports = {
    signin,
    changePassword,
    signup,
    forgotPassword,
    googleSignin,
    googleSignup,
};
