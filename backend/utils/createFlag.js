// const fs = require('fs')
// const path = require("path")
// const pathDestination = path.join(process.execPath, '..', '..', 'convert_success')

// module.exports = async function createFlag() {
//   const fileDesc = await fs.openSync(pathDestination, 'w', (err, data) => {
//     if (err) {throw err} else {return false};
//     // console.log(data);
//   });
// }

// file_descriptor = fs.openSync("example.txt");
// console.log("The file descriptor is:", file_descriptor);
//
// // Close the file descriptor
// fs.close(file_descriptor, (err) => {
//   if (err)
//     console.error('Failed to close file', err);
//   else {
//     console.log("\n> File Closed successfully");
//   }
// });