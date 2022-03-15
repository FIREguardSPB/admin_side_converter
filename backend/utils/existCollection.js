const mongoose = require('mongoose')

module.exports = async function existCollection(targetCollectionCheck, conn) {
  // const conn = mongoose.createConnection(_dbConnectionURL, {useUnifiedTopology: true, useNewUrlParser: true});
  conn.on('open', async function () {
   await conn.db.listCollections().toArray(function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
      collectionNames.forEach((collection) => {
        if (collection.name === targetCollectionCheck) {
          console.log('exist', collection)
        } else console.log('does not exist collection')
      })
      // conn.close();
    });
   conn.close
  });
}