const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  description: {type: String, required: true},
  created: {type: Date, required: true},
  documents: [{type: Types.ObjectId, ref: 'Document'}],
})

module.exports = model('Card', schema)