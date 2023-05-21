const {getUserByUsername, getUserById} = require('../helpers/user.helpers')
const {
  getTeamsWhereUserIsManager,
  getTeamsWhereUserIsWorker,
  getTeamById,
  getWorkers,
  linkToTeam,
  parseWorkers,
  createTeam
} = require('../helpers/team.helpers')
const {getTasks, calculateDeadline, createTask} = require("../helpers/task.helpers");
const {ValidationError} = require("../validators/user.validator");
const {createNotification} = require("../helpers/notification.helpers");

const getTeams = async (username) => {
  const user = await getUserByUsername(username)
  let teams
  if (user.type === 2) {
    teams = await getTeamsWhereUserIsManager(user)
  } else {
    teams = await getTeamsWhereUserIsWorker(user)
  }
  return teams
}

const getTeamWorkers = async (id) => {
  const team = await getTeamById(id)
  return getWorkers(team)
}

const getTeamTasks = async (id) => {
  const team = await getTeamById(id)
  return getTasks(team)
}

const addTask = async (team_id, name, description, deadline, ICId) => {
  const team = await getTeamById(team_id)
  const IC = await getUserById(ICId)
  if (!IC) {
    throw new ValidationError('Ответственный не выбран')
  }
  const date = calculateDeadline(deadline)
  const task = createTask(name, description, date, "Создано", IC)
  await linkToTeam(team, task)
  await createNotification("Создано новое поручение!", task, IC)
}

const addTeam = async (username, name, description, workersIds) => {
  const manager = await getUserByUsername(username)
  const workers = await parseWorkers(workersIds)
  await createTeam(name, description, manager, workers)
}

module.exports = {
  getTeams, getTeamWorkers, getTeamTasks, addTask, addTeam
}