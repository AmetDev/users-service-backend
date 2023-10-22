const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('./db.js')
const { validationResult } = require('express-validator')
const secret = 'AWS245V'
const generateAccessToken = (nickname, date_of_birth, admin) => {
	const payload = {
		nickname,
		date_of_birth,
		admin,
	}
	return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty) {
				return res.status(400).json({
					message: 'Ошибка при регистрации',
					errors,
				})
			}
			const {
				name,
				lastname,
				fathername,
				date_of_birth,
				nickname,
				password,
				admin,
			} = req.body
			const hashPassword = bcrypt.hashSync(password, 7)
			const canditator = await pool.query(
				'SELECT nickname FROM users WHERE nickname=$1',
				[nickname]
			)
			const isRow =
				canditator.rows.length === 0 ? '' : canditator.rows[0].nickname
			if (isRow === nickname) {
				res.json({
					message:
						'Пользователь с таким никнеймом уже существет. Попробуйте еще раз.',
				})
			} else {
				try {
					console.log(
						name,
						lastname,
						fathername,
						date_of_birth,
						nickname,
						password
					)
					const result = await pool.query(
						`INSERT INTO users ( name, lastname, fathername, date_of_birth, nickname, password, admin) VALUES($1, $2, $3, $4, $5, $6, $7)`,
						[
							name,
							lastname,
							fathername,
							date_of_birth,
							nickname,
							hashPassword,
							admin,
						]
					)
					let idUser
					try {
						const { nickname } = req.body
						console.log('NICKNAME', nickname)
						idUser = await pool.query(
							'select id from users where nickname = $1',
							[nickname]
						)
					} catch (error) {
						res.status(200).json(error)
					}
					await pool.query(
						'INSERT INTO history_users (user_id, type_activity, date_activity, nickname) VALUES($1, $2, $3, $4)',
						[idUser.rows[0].id, 'registration', '22-10-2023', nickname]
					)
					const token = generateAccessToken(nickname, date_of_birth, admin)
					res.json({ token })
				} catch (e) {
					res.send(e)
					console.log('inner catch', e)
				}
			}
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'registration error' })
		}
	}
	async login(req, res) {
		let idUser
		const { nickname, password, date_of_birth, admin } = req.body
		const user = await pool.query(
			'SELECT nickname, password FROM users WHERE nickname=$1',
			[nickname]
		)
		const isValidPassword = bcrypt.compareSync(password, user.rows[0].password)
		if (!isValidPassword) {
			return res.status(401).send({ auth: false, token: null })
		}
		if (nickname == user.rows[0].nickname && isValidPassword) {
			try {
				const { nickname } = req.body
				console.log('NICKNAME', nickname)
				idUser = await pool.query('select id from users where nickname = $1', [
					nickname,
				])
			} catch (error) {
				res.status(200).json(error)
			}
			await pool.query(
				'INSERT INTO history_users (user_id, type_activity, date_activity, nickname) VALUES($1, $2, $3, $4)',
				[idUser.rows[0].id, 'login', '22-10-2022', nickname]
			)
			const token = generateAccessToken(nickname, date_of_birth, admin)
			res.json({ token })
			console.log(user)
		} else {
			res.send(false)
			console.log(false)
		}
	}
	async getUsers(req, res) {
		try {
			const users = await pool.query('SELECT * FROM users')
			res.json(users)
		} catch (e) {
			res.json(e)
			console.log(e)
		}
	}
	async putUsers(req, res) {
		let idUser
		try {
			const user = req.body
			if (user.hasOwnProperty('nickname')) {
				if (user.hasOwnProperty('password')) {
					user.password = bcrypt.hashSync(user.password, 7)
				}
				const nickname = user.nickname
				delete user.nickname
				try {
					console.log('NICKNAME', nickname)
					idUser = await pool.query(
						'select id from users where nickname = $1',
						[nickname]
					)
				} catch (error) {
					res.status(200).json(error)
				}
				await pool.query(
					'INSERT INTO history_users (user_id, type_activity, date_activity, nickname) VALUES($1, $2, $3, $4)',
					[idUser.rows[0].id, 'putUser', '22-10-2021', nickname]
				)
				const updateValues = Object.entries(user)
					.map(([key, value]) => `${key} = '${value}'`)
					.join(', ')
				await pool.query(
					`UPDATE users SET ${updateValues} WHERE nickname = '${nickname}'`
				)
				res.send('good')
			} else {
				res.status(200).send({ message: 'Введите никнейм' })
			}
		} catch (e) {
			res.send(e)
		}
	}
}

module.exports = new authController()
