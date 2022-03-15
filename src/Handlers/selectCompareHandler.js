export const selectCompareHandler = (copyData, copyCopyData, setStateData, typeField, modelName) => {
  if (!typeField) {
    return (e, data) => {
      const targetName = e.value[0]
      const sourceName = data.name
      //найти модель среди новых у которой поле name  === значению выбранному в select
      const newFindModel = copyData.newModelsToFront?.models.find(model => model.name === targetName ? model : null)
      //найти модель среди старых у которой поле name === значению исходной модели
      const oldFindModel = copyData.oldModelsToFront?.models.find(model => model.name === sourceName ? model : null)
      const indexComparedFindModel = [];
      //находим индекс модели среди отрисованных моделей значение old_name которого равно значению исходной модели
      copyCopyData.models.forEach((el, i) => {
        if (el.old_name === sourceName) {
          indexComparedFindModel.push(i)
        }
      })
      //получаем саму модель из отрисованных на которой произведен выбор
      const sourceFindModel = Object.assign({}, copyCopyData.models.find((el) => el.old_name === sourceName ? el : null))
      sourceFindModel.new_id = newFindModel.id
      sourceFindModel.new_name = newFindModel.name
   // const newFields = newFindModel.fields
      // sourceFindModel.fields = []
      // newFields.forEach((field) => {sourceFindModel.fields.push({old_id: field.id, old_name: field.name, type: field.type, new_id: '', new_name: ''})})
      
      
      sourceFindModel.matched = true
      
      //замена старой модели на модифицированную новую
      copyCopyData.models.splice(indexComparedFindModel, 1, sourceFindModel).sort()
      const updateData = Object.assign({}, copyCopyData)
      setStateData(updateData)
    }
  }
  if (typeField === 'fields') {
    return (e, data) => {
      console.log(data)
      //выбранное значение в селекте
      const targetFieldName = e.value[0]
      const targetId= e.value[1]
      const targetType = e.value[2]
      //     console.log('value=', targetFieldName)
      // имя самой модели в котором выбрано поле
      const sourceModelName = modelName
      //     console.log('name of element=', sourceModelName)
      //имя поля селекта
      const sourceNameField = data.name[0]
      const oldId = data.name[1]
      
      const indexComparedFindModel = [];
      //находим индекс модели среди отрисованных моделей значение old_name которого равно значению исходной модели
      copyCopyData.models.forEach((el, i) => {
        if (el.old_name === sourceModelName) {
          indexComparedFindModel.push(i)
        }
      })
      //найти модель среди новых у которой поле name  === значению выбранному в select
      // const newFindModel = copyData.newModelsToFront?.models.find(model => model.name === sourceModelName ? model : null)
      // const newFieldData = newFindModel?.fields.find(field => field.name === targetFieldName)
      // const oldFindModel = copyData.oldModelsToFront?.models.find(model => model.name === sourceModelName ? model : null)
      // const oldFieldData = oldFindModel?.fields.find(field => field.name === targetFieldName)
      
      
      //получаем саму модель из отрисованных на которой произведен выбор
      const sourceFindModel = Object.assign({}, copyCopyData.models.find((el) => ((el.old_name === sourceModelName) || (el.new_name === sourceModelName)) ? el : null))
      if (sourceFindModel) {
        sourceFindModel?.fields?.forEach((field) => {
          if (field.old_name === sourceNameField) {
            field.old_name = sourceNameField;
            field.old_id = oldId;
            field.new_name = targetFieldName;
            field.new_id = targetId
            field.type = targetType
            field.matched = true
          }
        })
        copyCopyData.models.splice(indexComparedFindModel, 1, sourceFindModel).sort()
      }
      const updateData = Object.assign({}, copyCopyData)
      setStateData(updateData)
    }
  }
  if (typeField === 'DB'){
    return (e, data) => {
      const targetDB = e.value
      const sourceName = data.name
      const indexComparedFindModel = [];
      //находим индекс модели среди отрисованных моделей значение old_name которого равно значению исходной модели
      copyCopyData.models.forEach((el, i) => {
        if (el.old_name === sourceName) {
          indexComparedFindModel.push(i)
        }
      })
      const sourceFindModel = Object.assign({}, copyCopyData.models.find((el) => el.old_name === sourceName ? el : null))
      sourceFindModel.source_db = targetDB
      copyCopyData.models.splice(indexComparedFindModel, 1, sourceFindModel).sort()
      const updateData = Object.assign({}, copyCopyData)
      setStateData(updateData)
    }
  }
}