const jwt = require('jsonwebtoken')
const secret = 'AWS245V'
module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(403).json({ message: 'Пользователь не авторизован' })
			}
			const { admin } = jwt.verify(token, secret)
			let hasRole = false
			if (admin == roles) {
				next()
			} else {
				return res.status(403).json({ message: 'У вас нет доступа' })
			}
		} catch (e) {
			console.log(e)
			return res.status(403).json({ message: 'Пользователь не авторизован' })
		}
	}
}
