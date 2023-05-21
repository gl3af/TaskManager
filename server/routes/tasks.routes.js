const {Router} = require('express')
const router = Router()
const taskController = require('../controllers/task.controller')

// api/tasks/users/:username
router.get('/users/:username', taskController.getAll)

// api/tasks/:id/
router.get('/:id', taskController.getById)

// api/tasks/:id/subtasks
router.get('/:id/subtasks', taskController.getSubtasks)

// api/tasks/:id/add-executor
router.put('/:id/add-executor', taskController.addExecutor)

// api/tasks/:id/accept
router.put('/:id/accept', taskController.accept)

// api/tasks/:id/get-team-workers
router.get('/:id/get-team-workers', taskController.getWorkers)

// api/tasks/:id/subtasks/create
router.post('/:id/subtasks/create', taskController.createSubtask)

module.exports = router