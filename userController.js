const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./db.js");
const { validationResult } = require("express-validator");
const secret = "AWS245V";
const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          message: "Ошибка при регистрации",
          errors,
        });
      }
      const { name, lastname, fathername, date_of_birth, nickname, password } =
        req.body;
      const hashPassword = bcrypt.hashSync(password, 7);
      const canditator = await pool.query(
        "SELECT nickname FROM users WHERE nickname=$1",
        [nickname],
      );
     const isRow =  canditator.rows.length === 0?  "": canditator.rows[0].nickname  
      if (isRow === nickname) {
        res.json({
          "message":
            "Пользователь с таким никнеймом уже существет. Попробуйте еще раз.",
        });
      }
      else {
        try {
          console.log(
            name,
            lastname,
            fathername,
            date_of_birth,
            nickname,
            password,
          );
          const result = await pool.query(
            `INSERT INTO users (name, lastname, fathername, date_of_birth, nickname, password) VALUES($1, $2, $3, $4, $5, $6)`,
            [name, lastname, fathername, date_of_birth, nickname, hashPassword],
          );
          res.send(result);
        } catch (e) {
          res.send(e);
          console.log("inner catch", e);
        }
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "registration error" });
    }
  }
}

module.exports = new authController();
