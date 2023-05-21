const Task = require('../models/Task')
const User = require('../models/User')
const Team = require('../models/Team')
const {getTaskId} = require("./id.helpers");

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

const calculateDeadline = async (deadline) => {
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
  let tasksIC = []
  let tasksExecutor = []
  const teamsIC = await Team.find({IC: user})
  for (let team of teamsIC) {
    const teamTasks = getTasks(team)
    tasksIC.push({team: team.name, tasks: teamTasks})
  }

  const teamsExecutor = await Team.find({IC: user})
  for (let team of teamsExecutor) {
    const teamTasks = getTasks(team)
    tasksExecutor.push({team: team.name, tasks: teamTasks})
  }
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
  task.status = "Исполняется"
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

module.exports = {
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
  createSubtask
}