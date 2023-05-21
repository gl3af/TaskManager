const {Router} = require('express')
const router = Router()
const authController = require('../controllers/auth.controller')

// /api/login
router.post('/login', authController.login)

// /api/register
router.post('/register', authController.register)

module.exports = router