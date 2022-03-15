const fs = require('fs');
const path = require("path")
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const rootDir = isPkg ? pkgPath : notPkgPath
const pathModels = path.join(isPkg ? pkgPath : notPkgPath, 'config', 'models')
const pathNewModels = path.join(isPkg ? pkgPath : notPkgPath, 'newconfig', 'models')

module.exports = async function readFile(nameModels, age, pathToFile) {
  try {
    if (!age) {
      return await Promise.all(nameModels.map(async (nameModel) => {
        return await new Promise((resolve) => {
          fs.readFile(path.join(pathModels, nameModel + '.json'), 'utf8', function (err, contents) {
            resolve(JSON.parse(contents).name)
          });
        })
      }))
    }
    if (age === 'convert'){
      // return await Promise.all(nameModels.map(async (nameModel) => {
      return await new Promise((resolve) => {
        fs.readFile(path.join(rootDir, 'convert_data.json'), 'utf8', function (err, contents) {
          if (err){resolve(new Error('Ошибка открытия файла с данными для конвертации'))}
          else
            resolve(JSON.parse(contents))
        });
      })
    }
    if (age === 'collections'){
      return await new Promise((resolve) => {
        fs.readFile(path.join(rootDir, 'collections_names.json'), 'utf8', function (err, contents) {
          if (err){resolve(new Error('Ошибка открытия файла с данными базы'))}
          if (contents) {
            console.log(contents)
            // if (contents.includes('��')) {
            //   const result = contents.split('��')[1]
            //   console.log(result)
              resolve(JSON.parse(contents))
            // }
          }
        });
      })
    }
    if (age && age !== 'convert'){
      let pathToConfig;
      if (age === 'new') {
        pathToConfig = pathToFile ? pathToFile : pathNewModels
      }
      if (age === 'old') {
        pathToConfig = pathToFile ? pathToFile : pathModels
      }
      return await Promise.all(nameModels.map(async (nameModel) => {
        return await new Promise((resolve) => {
          fs.readFile(path.join(pathToConfig, nameModel + '.json'), 'utf8', function (err, contents) {
            if (contents) {
              const resultContents = JSON.parse(contents)
              if (!resultContents.disabled) {
                resolve(resultContents)
              }
              else {resolve(null)}
            } else resolve('none')
          });
        })
      }))
    }
  } catch (e) {
    throw {
      errMsg: "Ошибка открытия файла. Убедитесь что конвертер запущен из корня папки модуля." +
        "Сервисная информация: Ошибка при чтении файла",
      statusConvert: 500
    }
  }
}
