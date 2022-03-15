const createBackup = require('../utils/createBackup')
const timeInfo = require('../utils/timeInfo')
const path = require("path")
const pathDestinationEnd = path.join(process.execPath, '..', '..', '/data', '/backupDBCompleteConverting')
module.exports = async function checkAndConvert(moveJournalsData, listDocuments, conn) {
  let flagSuccess = false
  try {
    // console.log(listDocuments)
    if (moveJournalsData.length) {
      let count = 0
      let startTime = new Date()
      for (let moveJournalItem of moveJournalsData) {
        console.log(`запись ${count} из ${moveJournalsData.length}`)
        count++
        timeInfo(startTime, count, moveJournalsData.length)
        for (let src_rec of listDocuments) {
          // console.log('DOCUMENT', src_rec.id_prev, 'note from journal', moveJournalItem.move_obj_id)
          if (moveJournalItem.move_obj_id.toString() === src_rec.id_prev.toString()) {
            if (!moveJournalItem.move_finished) {
              const deletedItem = await conn.db.collection('metas').deleteOne({id_prev: src_rec.id_prev})
              console.log('delete')
              if (deletedItem) {
                const savedItem = await conn.db.collection('metas').save(src_rec)
                if (savedItem) {
                  if(count === moveJournalsData.length){flagSuccess = true}
                  await conn.db.collection('move_journals').updateOne({
                    move_obj_id: src_rec.id_prev,
                    src_collection: src_rec.configId
                  }, {
                    $set: {
                      move_obj_id: src_rec.id_prev,
                      src_collection: src_rec.configId,
                      move_finished: true
                    }
                  })
                  console.log('UPDATE')
                } else {
                  await conn.db.collection('move_journals').updateOne({
                    move_obj_id: src_rec.id_prev,
                    src_collection: src_rec.configId
                  }, {
                    $set: {
                      move_obj_id: src_rec.id_prev,
                      src_collection: src_rec.configId,
                      move_finished: false
                    }
                  })
                  console.log('DOCUMENT NOT UPDATED')
                }
              }
            }
          }
        }
      }
      // conn.close()
      // flagSuccess = true
    }
    if (!moveJournalsData.length) {
      let count = 1
      for (let document of listDocuments) {
        count++
        // console.log(document)
        const firstSavedItem = await conn.db.collection('metas').save(document)
        if (firstSavedItem) {
          console.log('Документ сохранен в metas')
          if(count === listDocuments.length){flagSuccess = true}
          await conn.db.collection('move_journals').save({
            move_obj_id: document.id_prev,
            src_collection: document.configId,
            move_startedAt: new Date().toLocaleString(),
            move_finished: true
          })
        } else {
          await conn.db.collection('move_journals').save({
            move_obj_id: document.id_prev,
            src_collection: document.configId,
            move_startedAt: new Date().toLocaleString(),
            move_finished: false
          })
        }
        console.log(`запись ${count} из ${listDocuments.length}`)
      }
      // conn.close()
      // flagSuccess = true
    }
  } catch (e) {
    return false
  }
  if (flagSuccess) {
    return true
  } else {
    return false
  }
}