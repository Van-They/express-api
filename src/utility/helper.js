const multer = require("multer")
const address = "D:/Backend/node/demo_express/src/uploads";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, address);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

const moveFileDir = multer({ storage: storage })

module.exports.moveFileDir = moveFileDir