export const filledChecker = (stateData) => {
  const checkModelsDB = []
  stateData?.models.forEach(model => {
    if (!model.hasOwnProperty('source_db')) {
      checkModelsDB.push(1)
    }
  })
  const checkModels = []
  stateData?.models.forEach(model => {
    if (!model.new_id) {
      checkModels.push(1)
    }
  })
  const checkModelsFields = []
  stateData?.models.forEach(model => {
    model?.fields.forEach(field => {
      if (!field.new_id) {
        checkModelsFields.push(1)
      }
    })
  })
  const checkCollections = []
  stateData?.collections.forEach((collection) => {
    if (!collection.hasOwnProperty('source_db')) {
      checkCollections.push(1)
    }
  })
  if (checkModelsFields?.length || checkModelsDB?.length || checkModels?.length || checkCollections?.length) {
    console.log('Не заполнены все поля')
    return false
  } else return true
}