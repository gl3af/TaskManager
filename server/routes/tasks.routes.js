const {Router} = require('express')
const Team = require('../models/Team')
const User = require('../models/User')
const Task = require('../models/Task')
const router = Router()
const mongoose = require('mongoose');
const {getTaskId} = require("../DBActions/Id");

// api/tasks/users
router.get('users/:username', async (req, res) => {
  try {
    let data = []
    const username = req.params.username
    const user = await User.findOne({ username })
    const teams = await Team.find({ workersIds: user._id.toString() })
    for (const team in teams) {
      data.push({ name: team.name, id: team.id, tasks: teams.tasksIds })
    }
     res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findOne({ id })
    res.status(200).json(task)
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// api/tasks/:id/subtasks
router.get('/:id/subtasks', async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findOne({ id })
    let subtasks = []
    for (let subtask of task.subTasks) {
      const task = await Task.findOne({ _id: subtask })
      subtasks.push(task)
    }
    if (subtasks[0] === null)
      subtasks = []
    res.status(200).json(subtasks)
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
})

// /api/tasks/create
router.post('/:id/subtasks/create', async (req, res) => {
  try {
    const {name, description, deadline} = req.body
    const parent_id = req.params.id
    const parentTask = await Task.findOne({ id: parent_id })
    const IC = await User.findOne({_id: parentTask.IC._id.toString()})

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
      parentTask,
      deadline: date,
      status: "Создано",
      IC: IC._id.toString()
    })
    await task.save()
    parentTask.subTasks.push(task._id.toString())
    await parentTask.save()

    res.status(200).json({message: "Подзадача добавлена"})
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
})

module.exports = router