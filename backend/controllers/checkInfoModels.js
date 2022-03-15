const getInfo = require("../utils/getPrepareInfo.js");


module.exports = async function postPrepareInfo(req, res){
  try{
    // const {list} = req.body
    // console.log(list, 'oejfdeokpdk[')
    const prepareInfo = await getInfo(req.body)
    console.log(prepareInfo, req.body, '<=================Отдача фронту')
    res.status(200).json(prepareInfo)
  }
  catch (e) {
    res.status(500).json({e})
  }
  
}