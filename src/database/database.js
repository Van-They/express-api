const mysql = require("mysql2/promise")

const pool = mysql.createPool(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "demo_express",
        waitForConnections: true,
        debug: false,
    }
)
module.exports = pool