const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const {urlencoded} = require("express");

const app = express()
app.use(cors());
app.use(express.json({ extended: true }))
app.use(urlencoded({ extended: true }))
app.use('/api', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/teams', require('./routes/teams.routes'))
app.use('/api/tasks', require('./routes/tasks.routes'))
app.use('/api/notifications', require('./routes/notifications.routes'))

const PORT = config.get('port')

if (config.get('type') === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/PAPS')
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()