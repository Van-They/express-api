const crypto = require('crypto');
const { hashText } = require('./hash_encrypter');
 

async function tokenGenerator() {
    let randomBytes = crypto.randomBytes(32).toString('hex');
    const token = await hashText(randomBytes)
    return token
}

module.exports.tokenGenerator = tokenGenerator