const authService = require("../services/auth.service");
/**
 * creates new user for the system
 */
async function signup(ctx, next) {
    try {
        const credential = ctx.request.body.credential;
        if (credential) {
            return (ctx.body = await authService.googleSignup());
        } else {
            const { email, password } = ctx.request.body;
            const response = await authService.signup({
                email,
                password,
            });
            return (ctx.body = response);
        }
        //check if user already exists, if not add new user, if yes return message saying email or id already exists
    } catch (err) {
        throw err;
    }
}

/**
 * log user in to the system
 */
async function signin(ctx, next) {
    try {
        const credential = ctx.request.body.credential;
        if (credential) {
            return (ctx.body = await authService.googleSignin(credential));
        } else {
            const { email, password } = ctx.request.body;
            const response = await authService.signin({ email, password });
            return (ctx.body = response);
        }

        // check if user already exists, if exists check password, if password matches send token, if not password don't match message, if not user don't exist, signup
    } catch (err) {
        throw err;
    }
}

/**
 * sends an email with new password
 */
async function forgotPassword(ctx, next) {
    try {
        const { id } = ctx.request.body;
        // send email with new password after updating db with random password or a password reset link, response must say if your email exists, we have sent you an email, check inbox or spam.
        const response = await authService.forgotPassword({ id });
        return (ctx.body = response);
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
}

/**
 * updates password if old passwords match
 */
async function changePassword(ctx, next) {
    try {
        const { oldPassword, newPassword, userId } = ctx.request.body;
        // check if old password match, if not say old password don't match, else update with new password
        const response = authService.changePassword({
            userId,
            oldPassword,
            newPassword,
        });
        return (ctx.body = "password updated successfully");
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message,
        };
    }
}

module.exports = { signin, signup, changePassword, forgotPassword };
