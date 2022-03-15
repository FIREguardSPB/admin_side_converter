export const onInput = (selectNamesCollection, setSelectNameCollection, flag) => {
  return (e, dataSelect) => {
    let name, value;
    flag ? name = e.target.name : name = dataSelect.name
    flag ? value = e.target.value : value = e.value
    let check = []
    selectNamesCollection.forEach((el, i) => el.hasOwnProperty(name) ? check.push(i) : null)
    if (check.length) {
      const editSelectNamesCollections = selectNamesCollection
      editSelectNamesCollections[check[0]][name] = value
      console.log(`I HAVE ->>> ${value}`)
      console.log(editSelectNamesCollections)
      setSelectNameCollection(editSelectNamesCollections)
    } else {
      setSelectNameCollection((prev) => [...prev, {[name]: value}]);
      console.log('NEW ADDED')
    }
  }
}