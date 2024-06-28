const e = require("express");
const pool = require("../database/database");
const { hashText, compareHash } = require("../utility/hash_encrypter");
const { tokenGenerator } = require("../utility/token_generator");
async function index(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM user");
        if (rows && rows.length > 0) {
            const records = rows.map(row => {
                const { uid, password, ...rest } = row;
                return rest;
            });
            res.sendStatus(200, 'success', records)
            return;
        }

        res.sendStatus(200, 'success', [])

    } catch (err) {
        res.sendStatus(500, err['message'])
    }
}

async function createUser(req, res) {
    const username = req.query['username'];
    const password = req.query['password'];
    const email = req.query['email'];
    const phone = req.query['phone'];
    if (!username || !password || !phone) {
        res.sendStatus(400, "Field required")
        return;
    };
    try {
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        //check if user exist
        const queryUser = "SELECT * FROM user WHERE `username` LIKE ? AND `phone` LIKE ?"

        const [row] = await conn.query(queryUser, [username, phone])

        if (row && row.length > 0) {
            const response = row.map(e => {
                const { uid, password, ...rest } = e
                return rest
            })
            res.sendStatus(200, "User Already existed", response)
            return
        }

        //insert new user
        const query = "INSERT INTO user(`username`,`password`,`email`,`phone`,`imgPath`) VALUES (?,?,?,?,'')"

        const queryToken = "INSERT INTO token(`userId`,`token`) VALUES (?,?)"

        const hashPass = await hashText(password)
        const genToken = await tokenGenerator()

        const [newUser] = await conn.query(query, [username, hashPass, email, phone])

        if (newUser.affectedRows === 1) {

            await conn.query(queryToken, [newUser.insertId, genToken]);

            res.sendStatus(200, "User create successfully")
            await conn.commit()
            return
        } else {
            res.sendStatus(400, "User create failed")
            await conn.rollback()
        }
    } catch (err) {
        res.sendStatus(400, err['message'])
        await conn.rollback()
    }
}


async function login(request, response) {
    let username = request.query['username']
    let password = request.query['password']
    if (!username) {
        response.sendStatus(400, 'username is required')
        return
    }
    if (!password) {
        response.sendStatus(400, 'password is required')
        return
    }
    try {
        let result = false
        let user;
        const query = "SELECT * FROM `user` WHERE `username` LIKE ?"
        const value = [username]
        const [rows] = await pool.query(query, value)
        if (rows && rows.length > 0) {
            for (let i of rows) {
                result = await compareHash(i['password'], password)
                if (result) {
                    user = i
                    break
                }
            }
            if (result) {
                delete user['uid']
                delete user['password']
                response.sendStatus(200, "Login sucess", user) 
                return
            }
            response.sendStatus(404, "Login Failed")
            return
        }
        response.sendStatus(404, "Login Failed")
    } catch (err) {
        response.sendStatus()
    }

}

async function validateTokenExpire(request, response) {
    let userId = request.query['username']
    let token = request.query['token']

}


module.exports.index = index
module.exports.createUser = createUser
module.exports.login = login