const actions = require('../services/team.services')
const {getTeamById} = require("../helpers/team.helpers");
const {ValidationError} = require("../validators/user.validator");

const getAll = async (req, res) => {
  try {
    const username = req.params.username
    const teams = await actions.getTeams(username)
    res.status(200).json(teams)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id
    const team = await getTeamById(id)
    res.status(200).json(team)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const getWorkers = async (req, res) => {
  try {
    const id = req.params.id
    const workers = await actions.getTeamWorkers(id)
    res.status(200).json(workers)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const getTasks = async (req, res) => {
  try {
    const id = req.params.id
    const tasks = await actions.getTeamTasks(id)
    res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const createTask = async (req, res) => {
  try {
    const team_id = req.params.id
    const { name, description, deadline, ICId } = req.body
    await actions.addTask(team_id, name, description, deadline, ICId)
    res.status(200).json({ message: "Поручение создано" })
  } catch (e) {
    console.log(e)
    if (e instanceof ValidationError) {
      res.status(400).json({ message: e.message })
    }
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const create = async (req, res) => {
  try {
    const { username, name, description, selectedOptions } = req.body
    await actions.addTeam(username, name, description, selectedOptions)
    res.status(200).json({ message: "Команда добавлена" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

module.exports = {
  getAll, getById, getWorkers, getTasks, createTask, create
}

