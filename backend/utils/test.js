const diffArr = (arr1, arr2) => {
  return arr1.reduce((arr, el) => {
    if(!arr2.includes(el)){
      arr.push(el);
    }
    return arr
  }, [])
}
const test1 = [ 1, 2, 4, 6, 8, 7, 23, 4, 55]
const test2 = [1, 2, 5, 6, 7, 9]
console.log(diffArr(test1, test2))