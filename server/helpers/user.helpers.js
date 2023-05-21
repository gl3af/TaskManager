const User = require("../models/User")
const {getUserId} = require("./id.helpers");
const {sign} = require("jsonwebtoken");
const config = require("config");

const getUserBy_Id = async (_id)  => {
  return User.findOne({ _id })
}

const getUserById = async (id)  => {
  return User.findOne({ id })
}

const getUserByUsername = async (username)  => {
  return User.findOne({ username })
}

const getUserByEmail = async (email)  => {
  return User.findOne({ email })
}

const getUserByPhoneNumber = async (phoneNumber)  => {
  return User.findOne({ phoneNumber })
}

const createUser = async (username, password, surname, name, lastName, phoneNumber, email, isManager) => {
  const hashedPassword = await bcrypt.hash(password, 12)
  const type = isManager ? 2 : 0
  const id = await getUserId()
  const user = new User({
    id, username, password: hashedPassword,
    surname, name, lastName,
    phoneNumber, email,
    type
  })
  await user.save()
}

const getUsers = async () => {
  return User.find({ type: 0 })
}

const createToken = (username) => {
  return sign(
    {username: username},
    config.get('jwtSecret'),
    {expiresIn: '1h'}
  )
}

const getUserType = async (username) => {
  const user = await User.findOne({username})
  return user.type
}

module.exports = {
  getUserById,
  getUserByUsername,
  getUserByPhoneNumber,
  getUserByEmail,
  getUserBy_Id,
  getUsers,
  createUser,
  createToken,
  getUserType
}