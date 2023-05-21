const {Router} = require("express");
const router = Router()
const notificationController = require('../controllers/notification.controller')

// /api/notifications/:username/new
router.get('/:username/new', notificationController.getNewNotifications)

// /api/notifications/:username
router.get('/:username/', notificationController.getAllNotifications)

// /api/notifications/:id
router.put('/:id/', notificationController.readNotification)

module.exports = router