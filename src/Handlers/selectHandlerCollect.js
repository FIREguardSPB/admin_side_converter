export const selectHandlerCollect = (selectData, value, setStateData, copyData) => {
  copyData?.collections?.forEach((collection) => {
    console.log(collection.old_id, selectData.name)
    if (collection.old_name === selectData.name) {
      collection.old_id = value
      collection.source_db = value
    }
  })
  setStateData(copyData)
}