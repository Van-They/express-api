const moment = require("moment")
const myMiddleware = function (req, res, next) {
    console.log('time: ', moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
    console.log('method: ', req.method)
    console.log('url:', req.originalUrl)
    next()
};

module.exports = myMiddleware