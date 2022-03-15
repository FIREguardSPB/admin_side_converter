const mongoose = require('mongoose')
const localDbConnect = 'mongodb://localhost:27016/va-catalog'
const startServerMongo = require('../utils/startServerMongo')
const processStatus = require("../utils/processStatus");
module.exports = async function getQty (nameCollection){
  console.log('qty foo work start')
  try {
    const onActiveMongo = await processStatus('mongod')
    // // await startServerMongo()
    if (!onActiveMongo) {startServerMongo()}
    const getQtyNotes = new Promise((resolve, reject) => {
      try {
      const conn = mongoose.createConnection(localDbConnect, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {if (err){resolve('off')}})
      conn.on('open', async function () {
        const count = await conn.db.collection('metas').countDocuments()
        console.log(count)
        resolve(count)
        reject(new Error('Нет соединения с базой'))
      })
        // conn.close()
    }
    catch (e) {
      throw {errMsg: "ошибка соединения", 'statusConvert': 500}
    }
    })
    return await getQtyNotes
  }
  catch (e) {
    console.log(e.message, '000000000999999999999788867567666622222233333333323323223')
    return e.message
  }
}
