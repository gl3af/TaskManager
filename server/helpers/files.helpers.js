const path = require("path")
const fs = require("fs")
const Document = require('../models/document.model')

const resolvePath = (fileName) => {
  return path.join(__dirname, '../files', fileName)
}

const createDocument = async (name) => {
  const document = new Document({ name })
  await document.save()
  return document
}

const moveFile = (filepath, newPath) => {
  fs.rename(filepath, newPath, () => {})
}

const renameFile = (oldPath, newPath) => {
  const fullOld = path.join(__dirname, '../files', oldPath)
  const fullNew = path.join(__dirname, '../files', newPath)
  fs.rename(fullOld, fullNew, () => {})
}

const getDocumentInfo = async (_id) => {
  const document = await Document.findOne({_id})
  return {
    filename: document.name,
    hash: document._id
  }
}

module.exports = {
  resolvePath, createDocument, moveFile, getDocumentInfo, renameFile
}