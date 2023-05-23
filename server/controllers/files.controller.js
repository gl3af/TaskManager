const formidable = require("formidable");
const actions = require("../services/files.services");
const path = require("path");
const {resolvePath} = require("../helpers/files.helpers");

const upload = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function (error, fields, file) {
      let filepath = file.fileData.filepath
      let fileName = file.fileData.originalFilename
      const document = await actions.uploadFile(filepath, fileName)
      res.status(200).json({ document })
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

const download = async (req, res) => {
  try {
    const _id = req.params.id
    const {filePath, filename} = await actions.getFilePath(_id)
    const path = resolvePath(filePath)
    res.download(path, filename)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

module.exports = {upload, download}