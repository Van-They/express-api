
const crypto = require('crypto')

function encryptText(text) {
    let encryptionKey = crypto.randomBytes(32);//key
    let iv = crypto.randomBytes(16);//init vector
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decryptText(text, key,iv) {
    let cipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key,'hex'), Buffer.from(iv,'hex'));
    let decrypted = cipher.update(text, 'hex', 'utf8');
    decrypted += cipher.final('utf8');
    return decrypted;
}

module.exports.encryptText = encryptText
module.exports.decryptText = decryptText