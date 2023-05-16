const User = require("../models/User")
const { Router } = require('express')
const router = Router()

// api/users/available
router.get('/available', async (req, res) => {
  try {
    const users = await User.find({ type: 0 })
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/users/
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/users/id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({ _id: id })
    res.status(200).json(user)
  } catch (e) {
    res.send({ status: 500, message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router