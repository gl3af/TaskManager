const { Router } = require('express')
const router = Router()
const teamController = require("../controllers/team.controller")

// api/teams/available
router.get('/available/:username', teamController.getAll)

// api/teams/:id
router.get('/:id', teamController.getById)

// api/teams/:id/workers
router.get('/:id/workers', teamController.getWorkers)

// api/teams/:id/tasks
router.get('/:id/tasks', teamController.getTasks)

// api/teams/:id/tasks/create
router.post('/:id/tasks/create', teamController.createTask)

// /api/teams/create
router.post('/create', teamController.create)

module.exports = router