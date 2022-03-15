const createJsonFile = require('../utils/createJsonFile.js')
module.exports = async function createJson(req, res){
  try{
    const jsonData = req.body
    const  createFile= await createJsonFile(jsonData, jsonData.nameFile)
    console.log(createFile, '<=================Запись файла')
    res.status(200).json(createFile)
  }
  catch (e) {
    res.status(500).json({e})
  }
  
}