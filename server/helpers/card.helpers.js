const Card = require('../models/card.model')

const addCard = async (description, rawDocuments) => {
  let documents = []
  for (let document of rawDocuments) {
    documents.push(document.document)
  }
  const card = new Card({
    description,
    documents,
    created: new Date(Date.now())
  })
  await card.save()
  return card
}

module.exports = {addCard}