//добавление поля fields с данными для корректного исходного отображения

export const checkerExistFields = (data, setStateData) => {
  const copyData = Object.assign({}, data)
  const {models, newModels, oldModels, collections} = copyData
  let flag = false;
  console.log(models)
  models?.forEach(model => {
    if (!model.hasOwnProperty('fields')) {
      flag = true
      const resultModel = oldModels.find(oldModel => oldModel?.name === model?.old_name ? oldModel : null)
      resultModel?.fields?.sort().forEach((field) => {
        field.old_id = field.id;
        field.old_name = field.name;
        delete field.id;
        delete field.name;
        field.new_id = '';
        field.new_name = '';
        field.matched = ''
      })
      model.new_id = ''
      model.new_name = ''
      model.fields = resultModel.fields
    }
  })
  collections?.forEach(collection => {
    if (!collection.hasOwnProperty('new_id')) {
      collection.new_id = 'none id'
    }
    if (!collection.hasOwnProperty('new_name')) {
      collection.new_name = 'none name'
    }
  })
  console.log(copyData)
  if (flag) {
    setStateData(copyData)
  }
}