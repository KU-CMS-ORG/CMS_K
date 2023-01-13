/**
 * creates new user for the system
 */
async function signup(ctx, next) {
    try {
		console.log(ctx.body);
		return ctx.body = "Hello world";
        //check if user already exists, if not add new user, if yes return message saying email or id already exists
		
	} catch (err) {
		throw err;
	}
}

/**
 * log user in to the system
 */
async function signin() {
    try {
        // check if user already exists, if exists check password, if password matches send token, if not password don't match message, if not user don't exist, signup
		const newUser = await prisma.tblUser.createMany({
			data: {
				userId: ctx.request.body.userId,
				fName: ctx.request.body.fName,
				mName: ctx.request.body.mName,
				lName: ctx.request.body.lName,
				email: ctx.request.body.email,
				password: ctx.request.body.password,
				phone: ctx.request.body.phone,
				countryCode: ctx.request.body.countryCode,
				role: ctx.request.body.role,
				faculty: ctx.request.body.faculty,
				userStatus: ctx.request.body.userStatus,
			},
		});
		if (user) {
			ctx.response.status = 201;

			ctx.body = {
				message: "New User created",

				data: newUser,
			};
		}

		await next();
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}

/**
 * sends an email with new password 
 */
async function forgotPassword() {
    try {
        // send email with new password after updating db with random password or a password reset link, response must say if your email exists, we have sent you an email, check inbox or spam.
		const newUser = await prisma.tblUser.createMany({
			data: {
				userId: ctx.request.body.userId,
				fName: ctx.request.body.fName,
				mName: ctx.request.body.mName,
				lName: ctx.request.body.lName,
				email: ctx.request.body.email,
				password: ctx.request.body.password,
				phone: ctx.request.body.phone,
				countryCode: ctx.request.body.countryCode,
				role: ctx.request.body.role,
				faculty: ctx.request.body.faculty,
				userStatus: ctx.request.body.userStatus,
			},
		});
		if (user) {
			ctx.response.status = 201;

			ctx.body = {
				message: "New User created",

				data: newUser,
			};
		}

		await next();
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
async function changePassword() {
    try {
        // check if old password match, if not say old password don't match, else update with new password
		const newUser = await prisma.tblUser.createMany({
			data: {
				userId: ctx.request.body.userId,
				fName: ctx.request.body.fName,
				mName: ctx.request.body.mName,
				lName: ctx.request.body.lName,
				email: ctx.request.body.email,
				password: ctx.request.body.password,
				phone: ctx.request.body.phone,
				countryCode: ctx.request.body.countryCode,
				role: ctx.request.body.role,
				faculty: ctx.request.body.faculty,
				userStatus: ctx.request.body.userStatus,
			},
		});
		if (user) {
			ctx.response.status = 201;

			ctx.body = {
				message: "New User created",

				data: newUser,
			};
		}

		await next();
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
}

module.exports = {signin, signup, changePassword, forgotPassword};