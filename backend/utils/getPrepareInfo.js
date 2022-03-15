const getListCollection = require('../utils/getListCollectionFromConfig.js')
const processStatus = require('../utils/processStatus.js')
const startServerMongo = require('../utils/startServerMongo.js')
const getDataFromJsonFile = require('../utils/readFile.js')
// const mongoose = require('mongoose')
// const localDbConnect = 'mongodb://localhost:27016/va-catalog'
// const cutterSymbols = require('./cutterSymbols.js')
const path = require("path");
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const pathModels = path.join(isPkg ? pkgPath : notPkgPath)
const pathToConfigFiles = path.join(pathModels, 'config', 'models')
const pathToNewConfigFiles = path.join(pathModels, 'newconfig', 'models')
const pathToCollectionsFiles = path.join(pathModels, 'config', 'collections')
const pathToNewCollectionsFiles = path.join(pathModels, 'newconfig', 'collections')
// const createJsonFile = require('./createJsonFile')
const prepareDataForJson = require('./prepareDataForJson.js')
const dataComparison = require('./dataComparison.js')
module.exports = async function getPrepareInfo() {
  try {
    //получение списка имен МОДЕЛЕЙ старых и новых
    const listNameFileOldModels = await getListCollection(pathToConfigFiles, 1)
    const listNameFileNewModels = await getListCollection(pathToNewConfigFiles, 1)
    
    //получение списка имен файлов КОЛЛЕКЦИЙ старых и новых
    const listNameFileOldCollections = await getListCollection(pathToCollectionsFiles, 1)
    const listNameFileNewCollections = await getListCollection(pathToNewCollectionsFiles, 1)
    
    
    // console.log(listCollectionsFromConfig, listCollectionsFromNewConfig, list, notPkgPath, pkgPath, listNameFileNewCollections, 'СПИСОК КОЛЛЕКЦИЙ, ПОЛУЧЕННЫХ ИЗ КОНФИГ ФАЙЛОВ')
    if (!listNameFileOldCollections.length || !listNameFileNewCollections.length) {
      throw {
        errMsg: "Коллекции для конвертации не обнаружены. Убедитесь что конвертер запущен из корня папки модуля.",
        statusConvert: 500
      }
    }
    
    ///===================Работа с файлами моделей
    //получение всех данных из моделей для последующей выборки/фильтрации
    const dataListFromNewModels = await getDataFromJsonFile(listNameFileNewModels, 'new')
    const dataListFromOldModels = await getDataFromJsonFile(listNameFileOldModels, 'old')
    
    
    //готовый для преобразования в джэйсон новый обеъкт с собранными данными
    const oldModelsDataForRecord = prepareDataForJson(dataListFromOldModels, {models: []}, 'models')
    const newModelsDataForRecord = prepareDataForJson(dataListFromNewModels, {models: []}, 'models')
    //массив имен коллекций
    const nameCollectionsFromOld = oldModelsDataForRecord[1]
    const nameCollectionsFromNew = newModelsDataForRecord[1]
    console.log('Массив имен коллекций старых и новых =========>>>> ', nameCollectionsFromOld, nameCollectionsFromNew)
    //запись json файла (аргументы: данные для записи, имя файла на выходе)
    // await createJsonFile(oldModelsDataForRecord[0], 'dataFromOldModels')
    // await createJsonFile(newModelsDataForRecord[0], 'dataFromNewModels')
    console.log('Записаны в файл данные старных и новых моделей dataFromOldModels.json & dataFromNewModels.json')
    /// ================ Работа с файлами коллекций =================================////
    //получение всех данных из файлов коллекций для последующей выборки/фильтрации
    const dataListFromOldCollections = await getDataFromJsonFile(listNameFileOldCollections, 'old', pathToCollectionsFiles)
    const dataListFromNewCollections = await getDataFromJsonFile(listNameFileNewCollections, 'new', pathToNewCollectionsFiles)
    console.log('Данные для последующей выборки старых моделей (новые не отображаем, дабы не ззасорять экран) ========>>>>', dataListFromOldModels?.[0])
    //готовый для преобразования в джэйсон новый объект с собранными данными
    const oldCollectionsDataForRecord = prepareDataForJson(dataListFromOldCollections, {collections: []}, 'collections')
    const newCollectionsDataForRecord = prepareDataForJson(dataListFromNewCollections, {collections: []}, 'collections')
    //запись json файла (аргументы: данные для записи, имя файла на выходе)
    // await createJsonFile(oldCollectionsDataForRecord, 'dataFromOldCollections')
    // await createJsonFile(newCollectionsDataForRecord, 'dataFromNewCollections')
    console.log('Запись в файлы данных для последующей записи в базу, dataFromOldCollections.json и dataFromNewCollections.json')
    // //новая таблица коллекций сформированная на основе старой по совпадениям по полю ID и записи значения name
    // const tableMatchedCollectionsFromCollectionsOld = checkMatchNameCollectionFromCollectionTable(nameCollectionsFromOld, oldCollectionsDataForRecord)
    // const tableMatchedCollectionsFromCollectionsNew = checkMatchNameCollectionFromCollectionTable(nameCollectionsFromNew, newCollectionsDataForRecord)
    
    //===============АВТОМАТИЧЕСКОЕ СОПОСТАВЛЕНИЕ=================================
    const comparedCollections = dataComparison(oldCollectionsDataForRecord, newCollectionsDataForRecord, 1)
    // await createJsonFile(comparedCollections, 'collections_compared.json')
    console.log('файл с результатами автоматического сопоставления collections_compared.json')
    const comparedModels = dataComparison(oldModelsDataForRecord[0], newModelsDataForRecord[0])
    
    
    //Проверка статуса модуля - запущен или нет.
    const onActiveModule = await processStatus('VIAR_Module')
    const onActiveMongo = await processStatus('mongod')
    console.log('Запущен ли модуль VIAR? false ot true ====>> ', onActiveModule)
    // if(onActiveMongo){await processStatus('mongod', 'kill')}
    if (onActiveModule) {
      throw {errMsg: "Закройте модуль VIAR!", statusConvert: 500}
    }
    if (onActiveMongo) {
      throw {
        errMsg: `Закройте сервер mongo! Или просто нажмите кнопку "Отмена" (конвертер сам завершит работу сервера mongo) и повторите снова`,
        statusConvert: 500
      }
    }
    if (!onActiveModule) {
      //запуск сервера монго
      const pidServer = startServerMongo()
      console.log(pidServer.pid, 'Номер процесса, запущенного сервера')
      //соединение с базой
      if (pidServer) {
        console.log("Сервер монго запущен")
        //==========================================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!========================================================
        
        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        
        // при продакшене получение имен всех коллекций из предоставленного клиентом файла <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< =======================================================
        
        const namesCollectionsFromDb = await getDataFromJsonFile(listNameFileNewModels, 'collections')
        console.log(namesCollectionsFromDb)
        if(!namesCollectionsFromDb?.length) {
          throw {
            errMsg: "Не удалось получить имена коллекций в базе. Возможно отсутствует файл от клиента со списком коллекций",
            statusConvert: 500
          }
        }
        // //при разработке получение списка имен всех коллекций в базе
        // const namesCollectionsFromDb = await new Promise((resolve, reject) => {
        //   try {
        //     const conn = mongoose.createConnection(localDbConnect, {
        //       useUnifiedTopology: true,
        //       useNewUrlParser: true
        //     }, (err) => {
        //       if (err) {
        //         resolve('off connection')
        //       }
        //       // else resolve('Соединение с базой успешно')
        //     })
        //     conn.on('open', async function () {
        //       const namesCollections = await new Promise((resolve, reject) => {
        //         conn.db.listCollections().toArray(function (err, names) {
        //           console.log('Сбор имен коллекций из базы')
        //           resolve(names)
        //         })
        //       })
        //       resolve(namesCollections.reduce((arr, collection) => {
        //         arr.push(collection.name);
        //         return arr
        //       }, []))
        //       reject(new Error('Нет соединения с базой'))
        //     })
        //   } catch (e) {
        //     throw {errMsg: "ошибка соединения", 'statusConvert': 500}
        //   }
        // })
        const killed = await processStatus('mongod', 'kill')
        console.log('Статус выгруженного процесса ===>> ', killed)
        const newModelsToFront = newModelsDataForRecord[0]
        const oldModelsToFront = oldModelsDataForRecord[0]
        console.log('Передача на фронт собранных данных для отображения в форме сопоставления')
        return {comparedModels, newModelsToFront, oldModelsToFront, namesCollectionsFromDb, comparedCollections}
      }
    } else {
      throw {
        errMsg: "Модуль или сервер активны! Для корректной работы конвертора модуль и сервер должны быть выключены.",
        statusConvert: 500
      }
    }
  } catch (e) {
    console.log(e)
    return {statusConvert: 500, errMsg: e.errMsg}
  }
}


