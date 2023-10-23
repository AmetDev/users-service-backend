const Router = require('express')

const router = new Router()
const userController = require('./userController.js')
const checkRoleMiddleware = require('./middleware/checkRoleMiddleware.js')
const authMiddleware = require('./middleware/authMiddleware.js')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/putusers', authMiddleware, userController.putUsers)
router.get('/users', checkRoleMiddleware(true), userController.getUsers)
router.get(
	'/getallhistory',
	checkRoleMiddleware(true),
	userController.getAllHistory
)
router.get(
	'/getonehistory',
	checkRoleMiddleware(true),
	userController.getOneHistory
)
module.exports = router
