const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "12312323";
const accessTokenExipry = "1h";
/**
 * create a jwt
 * @param {{}} data
 * @returns {String} token
 */
function createToken(data) {
    return jwt.sign(
        {
            data: data,
        },
        TOKEN_SECRET,
        { expiresIn: accessTokenExipry }
    );
}

/**
 * checks if a token in valid or not
 * @param {String} token
 * @returns
 */
function matchToken(token) {
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        return decoded;
    } catch (err) {
        throw err;
    }
}

module.exports = { createToken, matchToken };
