const getInfo = require("../utils/getPrepareInfo.js");


module.exports = async function getPrepareInfo(req, res){
  try{
    const prepareInfo = await getInfo()
    console.log(prepareInfo, '<=================Отдача фронту')
    res.status(200).json(prepareInfo)
  }
  catch (e) {
    res.status(500).json({e})
  }
  
}