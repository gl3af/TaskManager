const User = require("../models/User");

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "ValidationError"
  }
}
async function userExists(username, phoneNumber, email) {
  let candidate = await User.findOne({ username })
  if (candidate)
    throw new ValidationError("Данный логин занят")

  candidate = await User.findOne({ email })
  if (candidate)
    throw new ValidationError("Данная почта занята")

  candidate = await User.findOne({ phoneNumber })
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
  ValidationError, userExists, checkData
}
