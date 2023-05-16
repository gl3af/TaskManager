const {Router} = require('express')
const User = require('../models/User')
const config = require('config')
const {sign} = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {ValidationError, userExists, checkData} = require("../validators/User");
const {createUser} = require("../DBActions/User");
const router = Router()

// /api/login
router.post('/login', async (req, res) => {
    try {
      const {username, password} = req.body
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден'})
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
      }

      const token = sign(
        {username: username},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )
      res.status(200).json({token, username, type: user.type})
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /api/register
router.post('/register', async (req, res) => {
    try {
      const {username, password, surname, name, lastName, phoneNumber, email, isManager} = req.body

      await userExists(username, phoneNumber, email)
      await checkData(surname, name, lastName, phoneNumber, email)

      const hashedPassword = await bcrypt.hash(password, 12)
      const type = isManager ? 2 : 0

      await createUser(username, hashedPassword, surname, name, lastName, phoneNumber, email, type)
      res.status(200).json({ message: 'Пользователь создан' })
    } catch (e) {
      console.log(e)
      if (e instanceof ValidationError) {
        res.status(400).json({ message: e.message })
      }
      else res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


module.exports = router