const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  manager: {type: Types.ObjectId, ref: 'User'},
  tasksIds: [{ type: Types.ObjectId, ref: 'Task' }],
  workersIds: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('Team', schema)