const Team = require('../models/Team')
const User = require("../models/User");
const {getUserBy_Id} = require("./user.helpers");
const {getTeamId} = require("./id.helpers");

const getTeamsWhereUserIsManager = async (user) => {
  return Team.find({manager: user})
}

const getTeamsWhereUserIsWorker = async (user) => {
  return Team.find({workersIds: user})
}

const getTeamById = async (id) => {
  return Team.findOne({id: id})
}

const getWorkers = async (team) => {
  let workers = []
  for (let _id of team.workersIds) {
    const worker = await getUserBy_Id(_id)
    workers.push(worker)
  }
  return workers
}

const linkToTeam = async (team, task) => {
  team.tasksIds.push(task._id.toString())
  await team.save()
}

const parseWorkers = async (workersIds) => {
  let workers = []
  for (let id of workersIds) {
    const worker = await User.findOne({ id })
    workers.push(worker)
  }
  return workers
}

const createTeam = async (name, description, manager, workersIds) => {
  const id = await getTeamId()
  const team = new Team({ id, name, description, manager, workersIds })
  await team.save()
}


module.exports = {
  getTeamsWhereUserIsWorker, getTeamsWhereUserIsManager, getTeamById, getWorkers, linkToTeam, parseWorkers, createTeam
}