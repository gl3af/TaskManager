const {createUser, getUserType, createToken} = require("../helpers/user.helpers");
const {validateRegister, validateLogin} = require("../validators/user.validator");

const register = async (username, password, surname, name, lastName, phoneNumber, email, isManager) => {
  try {
    await validateRegister(username, surname, name, lastName, phoneNumber, email)
    await createUser(username, password, surname, name, lastName, phoneNumber, email, isManager)
  } catch (e) {
    throw e
  }

}

const login = async (username, password) => {
  try {
    await validateLogin(username, password)
    const token = await createToken(username)
    const type = await getUserType(username)

    return {token, type}
  } catch (e) {
    throw e
  }
}

module.exports = {
  register, login
}