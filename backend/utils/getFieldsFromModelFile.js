import path from "path";


const getFieldsByModel = require('../utils/readFile')
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..' ,'..')
const pathModels = path.join(isPkg ? pkgPath : notPkgPath)
const pathToConfigFiles = path.join(pathModels, 'config', 'models')

const getFieldsFromModelFile = () => {
console.log(getFieldsFromModelFile())

}