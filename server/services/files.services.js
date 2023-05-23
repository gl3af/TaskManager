const {resolvePath, createDocument, moveFile, getDocumentInfo} = require("../helpers/files.helpers");
const uploadFile = async (filepath, fileName) => {
  const extension = fileName.split('.').reverse()[0]
  const document = await createDocument(fileName)
  const newPath = resolvePath(`${document._id}.${extension}`)
  moveFile(filepath, newPath)

  return document
}

const getFilePath = async (_id) => {
  const {filename, hash} = await getDocumentInfo(_id)
  const extension = filename.split('.').reverse()[0]
  return {
    filePath: `${hash}.${extension}`,
    filename
  }
}

module.exports = {uploadFile, getFilePath}