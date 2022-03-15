const exec = require('child_process');

const path = require('path')

const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const filePath = path.join(isPkg ? pkgPath : notPkgPath, 'dist', 'mongodb', 'bin', 'mongod.exe')
const pathToDb = path.join(isPkg ? pkgPath : notPkgPath, 'data', 'mongodb')
// const pathToLog = path.join('F:', 'other_module_folder', 'logs', 'mongo.log')
const {spawn} = require('child_process');
const args = ["--port", "27016", "--bind_ip", "127.0.0.1", "--dbpath", `${pathToDb}`]
module.exports = function startServerMongo() {
  try {
    return spawn(filePath, args, {cwd: process.cwd(), encoding: 'utf8', node: '--unhandled-rejections=strict'});
  } catch (e) {
    console.log(e)
  }
}
