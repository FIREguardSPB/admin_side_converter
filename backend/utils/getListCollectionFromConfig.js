const fs = require('fs')
const path = require('path')

//polyfill for replaceAll because node 10 is not supported it
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    
    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);
    
  };
}

module.exports = async function getListCollectionFromConfig(pathToTargetFolder, flag) {
  try {
    const result = []
    const modResult = []
    const fileNames = fs.readdirSync(pathToTargetFolder)
    fileNames.forEach(file => {
      const isFile = file.split('.')
      if (isFile[1] === 'json') {
        const finishResult = flag ? isFile[0] : isFile[0].replaceAll(new RegExp(/[^ a-zа-яё\d]+/gm), '')
        modResult.push(finishResult)
        result.push(isFile[0])
      }
    });
    console.log(modResult)
    return result
  } catch (e) {
    console.log(e)
    throw {
      errMsg: "Конфигурационный файл или коллекции для конвертации не обнаружены. Убедитесь что конвертер запущен из корня папки модуля.",
      statusConvert: 500
    }
  }
}