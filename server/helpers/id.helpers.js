const Id = require('../models/id.model')

async function getUserId() {
  const id = await Id.findOne()
  const user_id = id.user_id
  id.user_id += 1
  await id.save()
  return +user_id
}

async function getTeamId() {
  const id = await Id.findOne()
  const team_id = id.team_id
  id.team_id += 1
  await id.save()
  return +team_id
}

async function getTaskId() {
  const id = await Id.findOne()
  const task_id = id.task_id
  id.task_id += 1
  await id.save()
  return +task_id
}

async function getNotificationId() {
  const id = await Id.findOne()
  const notification_id = id.notification_id
  id.notification_id += 1
  await id.save()
  return +notification_id
}

module.exports = {
  getUserId, getTeamId, getTaskId, getNotificationId
}