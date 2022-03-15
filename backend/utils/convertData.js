const checkAndConvert = require("./checkAndConvert.js");
const processStatus = require("./processStatus.js");
const createBackup = require("./createBackup.js");
module.exports = async function convertData (data) {
  let {moveJournalsData, listDocuments, conn, flagSuccess, resolve, pathDestinationEnd, listCollection} = data
  const successConvert = await checkAndConvert(moveJournalsData, listDocuments, conn)
  if (successConvert) {
    // await createFlag()
    flagSuccess = true
    console.log(flagSuccess, 'Статус конвертации (успешно/не успешно)')
    conn.close()
    await resolve({successConvert, listCollection, listDocuments, statusConvert: 200})
    await processStatus('mongod', 'kill')
    await createBackup(pathDestinationEnd)
  }
  
  
}