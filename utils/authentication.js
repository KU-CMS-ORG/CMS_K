const authenticated = () => {
    return (ctx, next) => {
        if (ctx.isAuthenticated()) {
            return next();
        } else {
            // ctx.redirect('/users')
        }
    };
};

module.exports = authenticated;
