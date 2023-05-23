const Notification = require("../models/notification.model");
const {getNotificationId} = require("./id.helpers");
const {getUserByUsername} = require("./user.helpers");
const Task = require("../models/task.model")

const getNotifications = async (username, option) => {
  const user = await getUserByUsername(username)
  let notifications
  let result = []
  if (option) {
    notifications = await Notification.find({userId: user, read: false})
  } else {
    notifications = await Notification.find({userId: user})
  }
  for (let notification of notifications) {
    const task = await Task.findOne({_id: notification.taskId})
    result.push({
      id: notification.id,
      taskId: task.id,
      description: notification.description,
      read: notification.read
    })
  }
  return result
}

const createNotification = async (description, taskId, userId) => {
  const id = await getNotificationId()
  const notification = new Notification({
    id, description, taskId, userId, read: false
  })
  await notification.save()
}

const getUnread = async (username) => {
  return getNotifications(username, 'unread')
}

const read = async (id) => {
  const notification = await Notification.findOne({id})
  notification.read = true
  await notification.save()
}

module.exports = {
  getNotifications, createNotification, getUnread, read
}