const uploadFile = require('../Controller/image_upload_controller')
const fs = require('fs')
var localStorage = require('localStorage')

upload = async (req, res) => {
  try {
    await uploadFile(req, res)

    if (req.file == undefined) {
      return res.status(400).send({ status: 'false', message: 'gagal' })
    }
    res.status(200).send({
      status: 'true',
      message: 'Berhasil upload Image',
      imagename: localStorage.getItem('imagename') + req.file.originalname
    })
  } catch (err) {
    console.log(err)

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        status: 'false',
        message: 'File size cannot be larger than 2MB!'
      })
    }
    res.status(500).send({
      status: 'false',
      message: `Could not upload the file: ${req.file.originalname}. ${err}`
    })
  }
}

const getListFiles = (req, res) => {
  const directoryPath = __basedir + '/resources/static/assets/uploads/'

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!'
      })
    }

    const fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file
      })
    })

    res.status(200).send(fileInfos)
  })
}

const download = (req, res) => {
  const fileName = req.params.name
  const directoryPath = __basedir + '/public/uploads/'

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err
      })
    }
  })
}

module.exports = {
  upload,
  getListFiles,
  download
}
