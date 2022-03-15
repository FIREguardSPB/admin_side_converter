module.exports = function getDataFromFileModelsData(data, flag) {
  if (data) {
    if (flag === 'models') {
      const collections = []
      const newData = {id: data.id, name: data.name, mongo_collection: '', fields: [], attachments: {}}
      if (data.hasOwnProperty('fields')) {
        const {fields: fieldsFromData, attachments: attachData} = data
        const {fields, attachments} = newData
        fieldsFromData.forEach((field) => {
          fields.push({id: field.id, name: field.name, type: field.type});
          if (field.type === 'collection') {
            collections.push(field.collection)
          }
        });
        attachments.name = attachData.name;
        attachments.bucket = attachData.bucket;
      }
      return [newData, collections]
    }
    if (flag === 'collections') {
      const newData = {id: data.id, name: data.name}
     return newData
    }
  }
}