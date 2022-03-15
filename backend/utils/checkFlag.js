// const fs = require('fs')
// const path = require("path")
// const pathDestination = path.join(process.execPath, '..', '..', 'convert_success')
//
// module.exports = async function checkFlag() {
//   const res = await new Promise((resolve) => {
//     fs.access(pathDestination, function (error) {
//       if (error) {
//         console.log('not found')
//         resolve(false);
//       } else {
//         console.log('found file')
//         resolve(true);
//       }
//     })
//   })
//   return res
// }