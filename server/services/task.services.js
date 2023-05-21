const {getUserByUsername, getUserById} = require("../helpers/user.helpers");
const taskHelpers = require("../helpers/task.helpers");
const {createNotification} = require("../helpers/notification.helpers");
const {getWorkers} = require("../helpers/team.helpers");

const getAll = async (username) => {
  let tasks
  const user = await getUserByUsername(username)
  if (user.type === 2) {
    tasks = await taskHelpers.getGivenTasks(user)
  } else {
    tasks = await taskHelpers.getUserTasks(user)
  }
  return tasks;
}

const getTaskSubtasks = async (id) => {
  const task = await taskHelpers.getTaskById(id)
  return taskHelpers.getSubtasks(task)
}

const acceptTask = async (id) => {
  const status = "Исполняется"
  const task = await getTaskById(id)
  const IC = await getTaskIC(task)
  await taskHelpers.updateTaskStatus(task, status)
  await taskHelpers.updateParentTasksStatuses(task, status)
  await createNotification(`Задача ${task.name} принята исполнителем!`, task, IC)
}

const getTeamWorkers = async (id) => {
  const task = await taskHelpers.getTaskById(id)
  const parent = await taskHelpers.getParentTask(task)
  const team = await taskHelpers.getTaskTeam(parent)
  return getWorkers(team.id)
}

const addExecutor = async (id, executorId) => {
  const task = await taskHelpers.getTaskById(id)
  const executor = await getUserById(executorId)
  await taskHelpers.addTaskExecutor(task, executor)
  await createNotification("Вам назначена новая задача!", task, executor)
}

const addSubtask = async (parent_id, name, description, deadline) => {
  const parent = await taskHelpers.getTaskById(parent_id)
  const IC = await taskHelpers.getTaskIC(parent)
  const date = taskHelpers.calculateDeadline(deadline)
  await taskHelpers.createSubtask(name, description, date, parent, IC)
}

module.exports = {
  getAll, getTaskSubtasks, acceptTask, getTeamWorkers, addExecutor, addSubtask
}