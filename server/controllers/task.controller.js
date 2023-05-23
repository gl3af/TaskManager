const {getTaskById} = require("../helpers/task.helpers");
const actions = require("../services/task.services");
const {addCard} = require("../helpers/card.helpers");

const getAll = async (req, res) => {
  try {
    const username = req.params.username
    const data = await actions.getAll(username)
    res.status(200).json(data)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id
    const task = await getTaskById(id)
    res.status(200).json(task)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })  }
}

const getSubtasks = async (req, res) => {
  try {
    const id = req.params.id
    const subtasks = await actions.getTaskSubtasks(id)
    res.status(200).json(subtasks)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })  }
}

const addExecutor = async (req, res) => {
  try {
    const id = req.params.id
    const { executorId } = req.body
    await actions.addExecutor(id, executorId)
    res.status(200).json({ message: 'Исполнитель добавлен' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const accept = async (req, res) => {
  try {
    const id = req.params.id
    await actions.acceptTask(id)
    res.status(200).json({ message: 'Исполнитель добавлен' })
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
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
}

const createSubtask = async (req, res) => {
  try {
    const {name, description, deadline} = req.body
    const parent_id = req.params.id
    await actions.addSubtask(parent_id, name, description, deadline)
    res.status(200).json({message: "Подзадача добавлена"})
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
}

const createCard = async (req, res) => {
  try {
    const {description, documents} = req.body
    const id = req.params.id
    await actions.finishTask(id, description, documents)
    res.status(200).json({message: "Карточка исполнения добавлена"})
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
}

const getTaskCard = async (req, res) => {
  try {
    const id = req.params.id
    const card = await actions.getCard(id)
    res.status(200).json(card)
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Что-то пошло не так, попробуйте снова'})
  }
}

module.exports = {
  getById, getAll, getSubtasks, addExecutor, accept, getWorkers, createSubtask, createCard, getTaskCard
}