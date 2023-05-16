const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  IC: {type: Types.ObjectId, ref: 'User', required: true},
  executor: {type: Types.ObjectId, ref: 'User'},
  parentTask: {type: Types.ObjectId, ref: 'Task'},
  subTasks: [{type: Types.ObjectId, ref: 'Task'}],
  status: {type: String, required: true},
  deadline: {type: Date, required: true}
})

module.exports = model('Task', schema)