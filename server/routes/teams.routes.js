const { Router } = require('express')
const Team = require('../models/Team')
const User = require('../models/User')
const Task = require('../models/Task')
const router = Router()
const mongoose = require('mongoose')
const {Types} = require("mongoose");
const {getTeamId, getTaskId} = require("../DBActions/Id");

// api/teams/available
router.get('/available/:username', async (req, res) => {
  try {
    const username = req.params.username
    const user = await User.findOne({ username })
    let teams
    if (user.type === 2) {
      teams = await Team.find({ manager: user })
    } else {
      teams = await Team.find({ workersIds: user._id.toString() })
    }
    res.status(200).json(teams)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/teams/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const team = await Team.findOne({ id })
    res.status(200).json(team)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/teams/:id/workers
router.get('/:id/workers', async (req, res) => {
  try {
    let workers = []
    const id = req.params.id
    const team = await Team.findOne({ id })
    for (let _id of team.workersIds) {
      const worker = await User.findOne({ _id })
      workers.push(worker)
    }
    res.status(200).json(workers)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/teams/:id/tasks
router.get('/:id/tasks', async (req, res) => {
  try {
    let tasks = []
    const id = req.params.id
    const team = await Team.findOne({ id })
    for (let _id of team.tasksIds) {
      const task = await Task.findOne({ _id })
      tasks.push(task)
    }
    if (tasks[0] === null)
      tasks = []
    res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// api/teams/:id/tasks/create
router.post('/:id/tasks/create', async (req, res) => {
  try {
    const team_id = req.params.id
    const team = await Team.findOne({ id: team_id })
    const { name, description, deadline, ICId } = req.body
    const IC = await User.findOne({ id: ICId })
    if (!IC) {
      res.status(400).json({ message: 'Ответственный не выбран' })
      return
    }

    let date
    if (!deadline) {
      const current_date = new Date()
      date = new Date(current_date.setMonth(current_date.getMonth() + 1));
    } else {
      date = deadline
    }

    const id = await getTaskId()

    const task = new Task({
      id,
      name,
      description,
      deadline: date,
      status: "Создано",
      IC: IC._id.toString()
    })
    await task.save()
    team.tasksIds.push(task._id.toString())
    await team.save()
    res.status(200).json({ message: "Поручение создано" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/teams/create
router.post('/create', async (req, res) => {
  try {
    const { username, name, description, selectedOptions } = req.body

    const id = await getTeamId()
    const manager = await User.findOne({username})
    let workersIds = []
    for (let item of selectedOptions) {
      const user = await User.findOne({id: item.id})
      workersIds.push(user)
    }
    const team = new Team({ id, name, description, manager, workersIds })
    await team.save()
    res.status(200).json({ message: "Команда добавлена" })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router