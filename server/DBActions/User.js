const User = require("../models/User");
const {getUserId} = require("./Id");

async function createUser(username, password, surname, name, lastName, phoneNumber, email, type) {
  const id = await getUserId()
  const user = new User({
    id, username, password,
    surname, name, lastName,
    phoneNumber, email,
    type
  })
  await user.save()
}

module.exports = {
  createUser
}