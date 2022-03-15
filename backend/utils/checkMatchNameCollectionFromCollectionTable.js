module.exports = function checkMatchNameCollectionFromCollectionTable(tableCollections, dataCollections) {
  const result = [];
  dataCollections.collections.forEach((el) => {
    tableCollections.find((elem) => {
      if (el.id === elem) {
        result.push({[elem]: el.name})
      }
    })
  })
  return result
}