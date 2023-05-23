const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  description: {type: String, required: true},
  taskId: {type: Types.ObjectId, ref: 'Task', required: true},
  userId: {type: Types.ObjectId, ref: 'User',required: true},
  read: {type: Boolean, required: true, default: false}
})

module.exports = model('Notification', schema)