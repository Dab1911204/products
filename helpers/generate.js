const crypto = require('crypto');

module.exports.generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        const index = randomBytes[i] % charactersLength;
        result += characters.charAt(index);
    }

    return result;
};
