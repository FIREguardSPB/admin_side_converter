const mongoose= require("mongoose");
const localDbConnect = 'mongodb://localhost:27016/va-catalog'
module.exports = async function conn () {
  return new Promise((resolve) => {
    mongoose.createConnection(localDbConnect, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }, (err, connect) => {
      if (connect.on) {
        console.log('connect to DB OK')
        resolve (connect)
      }
    });
  })
}