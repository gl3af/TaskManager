const {getUnread, getNotifications, read} = require('../helpers/notification.helpers')
const {getTaskBy_Id} = require("../helpers/task.helpers");

const getNewNotifications = async (req, res) => {
  try {
    const username = req.params.username
    const notifications = await getUnread(username)
    res.status(200).json(notifications)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
}

const getAllNotifications = async (req, res) => {
  try {
    const username = req.params.username
    const notifications = await getNotifications(username)
    res.status(200).json(notifications)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
}

const readNotification = async (req, res) => {
  try {
    const id = req.params.id
    await read(id)
    res.status(200).json({ message: 'Прочитано' })
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
}

module.exports = {
  getAllNotifications, getNewNotifications, readNotification
}