const {Router} = require("express");
const router = Router()
const filesController = require('../controllers/files.controller')

// /api/files/upload
router.post('/upload', filesController.upload)

// /api/files/upload
router.get('/:id/', filesController.download)

module.exports = router