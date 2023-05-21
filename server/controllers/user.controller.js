const userHelpers = require("../helpers/user.helpers");
const getAll = async (req, res) => {
  try {
    const users = await userHelpers.getUsers()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await userHelpers.getUserBy_Id(id)
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

module.exports = {
  getAll, getById
}