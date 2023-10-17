const bcrypt = require('bcrypt.js')
const jwt = require('jsonwebtoken')
const {pool } = require("./db.js")
const { validationResult } = require('express-validator')
const secret = "AWS245V"
const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors =  validationResult(req)
            if(!error.isEmpty) {
                return res.status(400).json({message: "Ошибка при регистрации", error}) 
            }
            const {name, lastname, fathername, date_of_birth, nickname} = req.body;
            const hashPassword = bcrypt.hashSync(password, 7);
            const canditator = await pool.query("SELECT nickname FROM users WHERE nickname=$1", [nickname]) 
            if(canditator == nickname) {
                res.json({"message": "Пользователь с таким никнеймом уже существет.
                    Попробуйте еще раз."})
            } else {
                const result = await pool.query("INSERT INTO users ('name', 'lastname', 'fathername', 'date_of_birth', 'nickname')
                     VALUES($1, $2, $3, $4, #5)", [name, lastname, fathername, date_of_birth, nickname])
                res.send(result)
            } 
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'registration error'})
        }

    }
}

module.exports = new authController();
