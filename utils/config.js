const config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    port: process.env.PORT || 3000,
};
Object.seal(config);

module.exports = config;
