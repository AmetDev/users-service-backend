const Router = require('express')
const router = new Router()
const userController = require('./userController.js')
router.post('/registration', userController.registration);

module.exports = router;


