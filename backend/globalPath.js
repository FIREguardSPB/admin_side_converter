const path = require("path");
const isPkg = process.hasOwnProperty('pkg')

module.exports = function globalPath() {
  return isPkg ? path.join(process.execPath, '..') : path.join(__dirname, '..', '..')
}