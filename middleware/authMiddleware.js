const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		// Используйте 'method', не 'methods'
		next()
	} else {
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Не авторизован!!!' })
			}
			const decoded = jwt.verify(token, 'AWS245V')
			req.user = decoded
      next()
		} catch (e) {
			res.status(401).json({ message: 'Не авторизован!' })
		}
	}
}
