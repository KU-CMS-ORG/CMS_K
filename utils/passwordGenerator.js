var bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;
/**
 * generates a random password
 * @param {Number} passLength
 */
function generatePassword(passLength = 12) {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i <= passLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
}

/**
 *
 * @param {String} password
 * @returns {String} hashedPassword
 */
function encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
}

/**
 *
 * @param {String} passwordString
 * @param {String} passwordHash
 * @returns {boolean} true if match else false
 */
function comparePassword(passwordString, passwordHash) {
    return bcrypt.compareSync(passwordString, passwordHash);
}
module.exports = { generatePassword, encryptPassword, comparePassword };
