const bycrt = require('bcryptjs')

const saltRounds = 10

async function hashText(text) {

    let encryptedPassword = await bycrt.hash(text, saltRounds)

    return encryptedPassword
}

async function compareHash(hashText, text) {
    let pass = await bycrt.compare(text, hashText);
    return pass
}
 
module.exports.hashText = hashText
module.exports.compareHash = compareHash
