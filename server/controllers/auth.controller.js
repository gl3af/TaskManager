const actions = require('../services/auth.services')
const {ValidationError} = require("../validators/user.validator");

const login = async (req, res) => {
  try {
    const {username, password} = req.body
    const {token, type} = await actions.login(username, password)
    res.status(200).json({token, username, type})
  } catch (e) {
    console.log(e)
    if (e instanceof ValidationError) {
      res.status(400).json({ message: e.message })
      return
    }
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const register = async (req, res) => {
  try {
    const {username, password, surname, name, lastName, phoneNumber, email, isManager} = req.body
    await actions.register(username, password, surname, name, lastName, phoneNumber, email, isManager)
    res.status(200).json({ message: 'Пользователь создан' })
  } catch (e) {
    console.log(e)
    if (e instanceof ValidationError) {
      res.status(400).json({ message: e.message })
    }
    else res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

module.exports = {
  login, register
}