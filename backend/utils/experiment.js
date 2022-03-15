let arr = [1, 3, 6, 7, 2, 4, 9, 11, 22, 55, 132, 95, 6, 3, 2, 7, 0, "dfdf", 999, 3, 1, 2]
// let countItems = 0
// const lengthArr = arr.length
// const resultArr = []
const arraySplitter = (arr, qtyItems) => {
  // console.time('1')
  let countItems = 0
  const lengthArr = arr.length
  const resultArr = []
  const splitter = () => {
    if (countItems >= lengthArr) {
      return
    }
    resultArr.push(arr.slice(countItems, countItems + qtyItems))
    countItems = countItems + qtyItems
    splitter()
  }
  splitter()
  return resultArr
}
console.log(console.time('1'), arraySplitter(arr, 3), console.timeEnd('1'))