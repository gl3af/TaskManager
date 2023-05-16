const {Schema, model} = require('mongoose')

const schema = new Schema({
  id: {type: Number, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  type: {type: Number, required: true},
  surname: {type: String, required: true},
  name: {type: String},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phoneNumber: {type: String, required: true, unique: true}
})

module.exports = model('User', schema)