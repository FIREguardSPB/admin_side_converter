// const moveJournalsData = [{move_finished: true}, {move_finished: false}]
// const listDocuments = [1, 2]

module.exports = function convertedError(moveJournalsData, listDocuments) {
  if (!moveJournalsData.length) return true
  if (moveJournalsData.length && (moveJournalsData.length !== listDocuments.length)) return true
  if (moveJournalsData.length && (moveJournalsData.length === listDocuments.length)) {
    return moveJournalsData.some((el) => !el.move_finished)
  }
}
// console.log(convertedError(moveJournalsData, listDocuments))