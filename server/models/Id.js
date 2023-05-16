const {Schema, model} = require('mongoose')

const schema = new Schema({
  user_id: {type: Number, required: true},
  team_id: {type: Number, required: true},
  task_id: {type: Number, required: true},
  notification_id: {type: Number, required: true},
})

module.exports = model('Id', schema)