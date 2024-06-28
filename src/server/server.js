const { express, router } = require('../api/route');
const myLogger = require('../middleware/middleware');

const app = express()
//override default funtion with custom response
app.response.sendStatus = function (statusCode, message, data) {
    let status = statusCode === 200 ? "success" : "failed";
    let reponse = { "status": status, "msg": message, "record": data };
    if (statusCode != 200) {
        status = "Failed";
        delete reponse.record
    }
    return this.type('application/json').status(statusCode).json(reponse)
};

app.use(myLogger)
app.use('/', router)//main route

const port = process.env.port || 3000

app.listen(port)

console.log('Web Server is listening at port ' + (process.env.port || 3000))

module.exports.app = app