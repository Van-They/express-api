const express = require("express")
const { index, createUser, login } = require("../controller/user_controller");
const { uploadFileRes } = require("../controller/file_controller");
const { moveFileDir } = require("../utility/helper");
const router = express.Router()


router.post('/uploadFile', moveFileDir.single('file'), uploadFileRes);

router.post('/users', index);

router.post('/login', login)

router.post('/create-user', createUser);

module.exports.express = express
module.exports.router = router



// router.post('/encrypt-text', async (req, res) => {
//     let text = req.query['text']
//     if (!text) {
//         res.sendStatus(400, "failed")
//     }
//     let encrypted = await encryptPass.hashPassword(text)
//     res.sendStatus(200, "success", currentPassword)
// },)

// router.post('/decrypt-text', (req, res) => {

//     let key = req.query['key']
//     let text = req.query['text']
//     let iv = req.query['iv']

//     if (!text || !key || !iv) {
//         res.sendStatus(400, "Field required")
//         return;
//     }

//     let decrypted = encrypter.decryptText(text, key, iv)

//     res.sendStatus(200, "success", decrypted)

// })
// router.post('/token', async (req, res) => {
//     const result = await tokenGenerator()
//     res.sendStatus(200, "success", result)
// })