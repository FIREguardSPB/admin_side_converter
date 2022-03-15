const mongoose = require('mongoose')
const localDbConnect = 'mongodb://localhost:27016/va-catalog'
const getListCollection = require('./utils/getListCollectionFromConfig.js')
const getDocuments = require('./utils/getDocuments.js')
const createBackup = require('./utils/createBackup')
const checkAndConvert = require('./utils/checkAndConvert')
const convertedError = require('./utils/convertedError')
const path = require("path")
const pathDestinationFirst = path.join(process.execPath, '..', 'data','/backupBDBeforeConverting')
const pathDestinationEnd = path.join(process.execPath, '..', 'data', '/backupBDAfterConverting')
const processStatus = require('./utils/processStatus')
const startServerMongo = require('./utils/startServerMongo')
const convertData = require('./utils/convertData.js')
const conn = require('./utils/connectionToDB.js')
const cutterSymbols = require('./utils/cutterSymbols.js')
module.exports = async function startConv() {
  try {
    //проверка на наличие запущенных версий модуля
    return processStatus('VIAR_Module').then(async (onActive) => {
      if (!onActive) {
        console.log('not active')
        //backup BD
        await createBackup(pathDestinationFirst, 1)
        // Запуск сервера с базой
        startServerMongo()
        return new Promise((resolve, reject) => {
          //соединение с базой
          console.log('try connect to db')
          const conn = mongoose.createConnection(localDbConnect, {useUnifiedTopology: true, useNewUrlParser: true}, (err, connect) => {
            if (connect.on){
              console.log('connect to DB OK')
            }
          })
          console.log('try converting')
          conn.on('open', async function (err, result) {
            if (err) {
              console.log("ошибка соединения", err.message)
              throw {errMsg: `"ошибка соединения" ${err.message}`, 'statusConvert': 500}
            }
            let flagSuccess = false
// 1-stage: get notes from move_journals
            let moveJournalsData = await getDocuments('move_journals', conn)
            // console.log(moveJournalsData, 'журнал')
//2-stage: DB backup if !move_journals
            if (!moveJournalsData.length) {
              await createBackup(pathDestinationFirst, 1)
            }

//3-stage // //получение списка названий коллекций из папки конфига
            let listCollection = await getListCollection()
            // console.log(listCollection)
//4-stage: получение документов из всех коллекций
            let listDocuments = []
            for (let collection of listCollection) {
              if (collection !== 'move_journals' || 'metas') {
                listDocuments.push(...await getDocuments(cutterSymbols(collection), conn))
              }
            }
            //проверка на необходимость конвертации
            console.log(await convertedError(moveJournalsData, listDocuments), 'Проверка необходимости конвертации (да/нет)')
            if (!await convertedError(moveJournalsData, listDocuments)) {
              console.log('no errors')
              // await processStatus('mongod', 'kill')
              resolve({errMsg: "База уже конвертирована без ошибок и не требует повторной конвертации", statusConvert: 500})
            } else {
              const moveJournalsDataAgain = []
              const dataForConvertAgain = {moveJournalsDataAgain, listDocuments, conn, flagSuccess, resolve, pathDestinationEnd, listCollection}
              //если конвертация проводилась ранее при потере соединения во время конвертации
              if ((moveJournalsData.length && (moveJournalsData.length !== listDocuments.length)) || (moveJournalsData.length && !listDocuments.length)) {
                console.log('Ранее некорректное конвертирование')
                await conn.db.collection('metas').drop()
                await conn.db.collection('move_journals').drop()
                let listDocumentsAgain = []
                for (let collection of listCollection) {
                  if (collection !== 'move_journals' || 'metas') {
                    listDocumentsAgain.push(...await getDocuments(cutterSymbols(collection), conn))
                  }
                }
                await convertData(dataForConvertAgain)
                
                // const successConvertAgain = await checkAndConvert(moveJournalsDataAgain, listDocuments, conn)
                // if (successConvertAgain) {
                //   // await createFlag()
                //   flagSuccess = true
                //   console.log(flagSuccess, 'Статус конвертации (успешно/не успешно)')
                //   conn.close()
                //   await resolve({successConvertAgain, listCollection, listDocuments, statusConvert: 200})
                //   await processStatus('mongod', 'kill')
                //   await createBackup(pathDestinationEnd)
                // }
              } else {
                //первичная конвертация или проверка и исправление ошибок возникших при конвертации ранее
                //5-stage: check notes and convert
                const dataForConvert = {moveJournalsData, listDocuments, conn, flagSuccess, resolve, pathDestinationEnd, listCollection}
                console.log('Процесс начался')
                await convertData(dataForConvert)
                // const successConvert = await checkAndConvert(moveJournalsData, listDocuments, conn)
                // if (successConvert) {
                //   // await createFlag()
                //   flagSuccess = true
                //   console.log(flagSuccess, 'Статус конвертации (успешно/не успешно)')
                //   conn.close()
                //   await resolve({successConvert, listCollection, listDocuments, statusConvert: 200})
                //   await processStatus('mongod', 'kill')
                //   await createBackup(pathDestinationEnd)
                // }
              }
            }
            reject((e) => {
              return {errMsg: e.message, status: false}
            })
          })
        })
        // }
        // }
      } else {
        return {errMsg: 'Модуль VIAR активен! Закройте, пожалуйста, модуль и попробуйте снова', statusConvert: 500}
      }
   
    })
    
  } catch (e) {
    return {errMsg: e.message, statusConvert: 500}
  }
}