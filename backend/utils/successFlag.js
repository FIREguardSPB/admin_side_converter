const fs = require('fs')
const path = require("path")
const pathDestination = path.join(process.execPath, '..', 'convert_success')
// module.exports = async function successFlag () {
//   await fs.open(pathDestination, 'w', (err, data) => {
//     if (err) throw err;
//     // console.log(data);
//   });
// }
const successFlag = {
  createFlag:async function () {
    await fs.open(pathDestination, 'w', (err, data) => {
      if (err) {throw err} else {return false};
      // console.log(data);
    });
  },
  checkFlag: async function () {
    await fs.access(pathDestination, function(error){
      if (error) {
        console.log('not found')
        return false;
      } else {
        console.log('found file')
        return true;
      }
    })
  }
}
module.exports = successFlag