const Notification = require("../models/Notification");
const {getNotificationId} = require("./id.helpers");
const {getUserByUsername} = require("./user.helpers");

const getNotifications = async (userId, option) => {
  const read = !!option
  return Notification.find({ userId, read })
}

const createNotification = async (description, taskId, userId) => {
  const id = await getNotificationId()
  const notification = new Notification({
    id, description, taskId, userId, read: false
  })
  await notification.save()
}

const getUnread = async (username) => {
  const user = await getUserByUsername(username)
  return getNotifications(user, 'unread')
}

const read = async (id) => {
  const notification = await Notification.findOne({id})
  notification.read = true
  await notification.save()
}

module.exports = {
  getNotifications, createNotification, getUnread, read
}