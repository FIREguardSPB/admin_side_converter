const getDataFromFileModelsData = require("./getDataFromFileModelsData");
module.exports = function prepareModelsDataForJson(data, targetObj, flag) {
  const newData = Object.assign({}, targetObj)
  if (data.length) {
    if (flag === 'models') {
      const collections = []
      data.forEach((el) => {
        const getData = getDataFromFileModelsData(el, flag);
        if (getData[0]) {
          newData.models.push(getData[0])
        }
        if (getData[1].length)
          if (!collections.includes(...getData[1])) {
            collections.push(...getData[1])
          }
      })
      return [newData, collections]
    }
    if (flag === 'collections') {
      data.forEach((el) => {
        if (el) {
          const getData = getDataFromFileModelsData(el, flag);
          if (getData) {
            newData.collections.push(getData)
          }
        }
      })
      return newData
    }
  }
}