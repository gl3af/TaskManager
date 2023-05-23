const Task = require('../models/task.model')
const User = require('../models/user.model')
const Team = require('../models/team.model')
const Card = require('../models/card.model')
const Document = require('../models/document.model')

const {getTaskId} = require("./id.helpers");
const {getUserBy_Id} = require("./user.helpers");
const {createNotification} = require("./notification.helpers");

const getTasks = async (team) => {
  let tasks = []
  for (let _id of team.tasksIds) {
    const task = await Task.findOne({ _id })
    tasks.push(task)
  }
  if (tasks[0] === null)
    tasks = []
  return tasks
}

const calculateDeadline = (deadline) => {
  let date
  if (!deadline) {
    const current_date = new Date()
    date = new Date(current_date.setMonth(current_date.getMonth() + 1));
  } else {
    date = deadline
  }
  return date
}

const createTask = async (name, description, deadline, status, IC) => {
  const id = await getTaskId()
  const task = new Task({
    id,
    name,
    description,
    deadline,
    status,
    IC
  })
  await task.save()
  return task
}

const getGivenTasks = async (manager) => {
  let tasks = []
  const teams = await Team.find({manager})
  for (let team of teams) {
    const teamTasks = getTasks(team)
    tasks.push({team: team.name, tasks: teamTasks})
  }
  return tasks
}

const getUserTasks = async (user) => {
  const tasksIC = await Task.find({IC: user})
  const tasksExecutor = await Task.find({executor: user})
  return [tasksIC, tasksExecutor]
}

const getTaskById = async (id) => {
  return Task.findOne({id})
}

const getSubtasks = async (task) => {
  let subtasks = []
  for (let subtask of task.subTasks) {
    const task = await Task.findOne({ _id: subtask })
    subtasks.push(task)
  }
  if (subtasks[0] === null)
    subtasks = []

  return subtasks;
}

const getTaskIC = async (task) => {
  return User.findOne({_id: task.IC})
}

const updateTaskStatus = async (task, status) => {
  task.status = status
  await task.save()
}

const updateParentTasksStatuses = async (task, status) => {
  let parent = task
  while (parent.parentTask) {
    parent = await Task.findOne({_id: parent.parentTask})
    parent.status = status
    await parent.save()
  }
}

const updateParents = async (task) => {
  let parent = task
  while (parent.parentTask) {
    parent = await Task.findOne({_id: parent.parentTask})

    if (await childrenDone(parent)) {
      parent.status = 'Выполнено'
      await parent.save()

      if (parent.parentTask === null) { // Создана руководителем
        const team = await getTaskTeam(parent)
        const manager = await getUserBy_Id(team.manager)
        await createNotification(`Задача ${parent.name} выполнена!`, task, manager)
      }
    }
  }
}

const childrenDone = async (task) => {
  for (let _id of task.subTasks) {
    const task = await Task.findOne({_id})
    if (task.status !== 'Выполнено')
      return false
  }
  return true
}

const getParentTask = async (task) => {
  let parent = task
  while (parent.parentTask) {
    parent = await Task.findOne({_id: parent.parentTask})
  }
  return parent;
}

const getTaskTeam = async (task) => {
  return Team.findOne({tasksIds: task})
}

const addTaskExecutor = async (task, executor) => {
  task.executor = executor
  task.status = "Передано исполнителю"
  await task.save()
}

const createSubtask = async (name, description, deadline, parentTask, IC) => {
  const id = await getTaskId()
  const task = new Task({
    id,
    name,
    description,
    parentTask,
    deadline,
    status: "Создано",
    IC
  })
  await task.save()
  parentTask.subTasks.push(task)
  await parentTask.save()
}

const linkCard = async (task, card) => {
  task.card = card
  await task.save()
}

const getCardInfo = async (_id) => {
  const documents = []
  const card = await Card.findOne({_id})
  if (!card) {
    return {}
  }
  for (let _id of card.documents) {
    const document = await Document.findOne({_id})
    documents.push(document)
  }
  return {
    created: card.created,
    description: card.description,
    documents
  }
}

module.exports = {
  getCardInfo,
  getTasks,
  calculateDeadline,
  createTask,
  getGivenTasks,
  getUserTasks,
  getTaskById,
  getSubtasks,
  getTaskIC,
  updateTaskStatus,
  updateParentTasksStatuses,
  getParentTask,
  getTaskTeam,
  addTaskExecutor,
  createSubtask,
  linkCard,
  updateParents
}