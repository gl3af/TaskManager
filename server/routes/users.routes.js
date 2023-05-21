const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user.controller')

// api/users/available
router.get('/available', userController.getAll)

// api/users/id
router.get('/:id', userController.getById)

module.exports = router