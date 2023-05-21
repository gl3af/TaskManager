const userHelpers = require('../helpers/user.helpers')
const bcrypt = require("bcryptjs");

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "ValidationError"
  }
}

const validateRegister = async (username, surname, name, lastName, phoneNumber, email) => {
  await userExists(username, phoneNumber, email)
  await checkData(surname, name, lastName, phoneNumber, email)
}

const validateLogin = async (username, password) => {
  const user = await userHelpers.getUserByUsername(username)
  if (!user) {
    throw new ValidationError('Пользователь не найден')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ValidationError('Неверный пароль, попробуйте снова')
  }
}
const userExists = async (username, phoneNumber, email) => {
  let candidate = await userHelpers.getUserByUsername(username)
  if (candidate)
    throw new ValidationError("Данный логин занят")

  candidate = await userHelpers.getUserByEmail(email)
  if (candidate)
    throw new ValidationError("Данная почта занята")

  candidate = await userHelpers.getUserByPhoneNumber(phoneNumber)
  if (candidate)
    throw new ValidationError("Данный номер телефона занят")
}
async function checkData(surname, name, lastName, phoneNumber, email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const namesRegex = /^[а-яА-Я]+$/
  const phoneNumberRegex = /^(\+7|7|8|)9[0-9]{9}$/

  if (!surname.match(namesRegex))
    throw new ValidationError("Неверный формат фамилии")
  if (!name.match(namesRegex))
    throw new ValidationError("Неверный формат имени")
  if (lastName.length > 0 && !lastName.match(namesRegex))
    throw new ValidationError("Неверный формат отчества")

  if (!email.match(emailRegex))
    throw new ValidationError("Неверный формат почты")
  if (!phoneNumber.match(phoneNumberRegex))
    throw new ValidationError("Неверный формат номера телефона")
}

module.exports = {
  ValidationError, validateRegister, validateLogin
}
