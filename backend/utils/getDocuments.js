const namingConverter = require('./namingConverter.js')
const getDocsFromCollection = require('../service/getDocsFromCollection.js')
const cutterSymbols = require('../utils/cutterSymbols.js')
//получение всех данных из коллекции с приведением к новой структуре
module.exports = async function getDocuments(name, conn) {
  // return await conn.on('open', async function () {
  try {
    console.log(name, 'имяколлекции')
    console.log('функция получения длокументов из коллекции')
    // const result = await new Promise((resolve, reject) => {
      if (name !== 'moves_journals'){
        const result = await getDocsFromCollection(namingConverter(cutterSymbols(name)), conn)
        // conn.db.collection(namingConverter(name)).find().toArray((err, result) => {
          console.log(result, 'RESULT')
          if(result && result.length) {
            result.forEach((item) => {
            //   item.id_prev = item._id
            //   delete item._id
            //   delete item.updatedAt
              item.configId = cutterSymbols(name);
              item.modelName = name;
            })
            return result
          }
          else {return []}
        //   // resolve(result)
        //   // reject(new Error('Get data error'))
        //
        // })
        // conn.close()
    }
      else {
        return await getDocsFromCollection(namingConverter(name))
      //   conn.db.collection(namingConverter(name)).find().toArray((err, result) => {
      //   // resolve(result)
      //   // reject(new Error('Get data error'))
      //   // }
      // })
      
      }
      // conn.close()
    // })
    // return result
  }
  catch (e) {
    return e
  }
  // if (result.length){return result} else return false
}