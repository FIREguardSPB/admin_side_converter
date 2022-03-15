// const mongoose = require('mongoose')
// const localDbConnect = 'mongodb://localhost:27016/va-catalog'
// const conn = mongoose.createConnection(localDbConnect, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// })
module.exports = async function getDocsFromCollection (nameCollection, conn) {
  return new Promise((resolve, reject) => {
    conn.db.collection(nameCollection).find().toArray((err, result) => {
      resolve(result)
      reject(new Error('Get data error'))
    })
  })
}