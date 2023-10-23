const Router = require('express')

const router = new Router()
const userController = require('./userController.js')
const checkRole = require('./middleware/checkRoleMiddleware.js')
const authMiddleware = require('./middleware/authMiddleware.js')
const historyController = require('./historyController.js')
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/putusers', authMiddleware, userController.putUsers)
router.get('/users', checkRole(true), userController.getUsers)
router.get('/getallhistory', checkRole(true), historyController.getAllHistory)
router.get('/getonehistory', checkRole(true), historyController.getOneHistory)
module.exports = router
