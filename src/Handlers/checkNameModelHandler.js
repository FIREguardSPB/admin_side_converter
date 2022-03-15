import {postPrepareInfo} from "../Utils/postPrepareInfo";

const checkerArr = (arr1, arr2) => {
  for (let el of arr1) {
    for (let elem of arr2) {
      if (Object.keys(el)[0] === Object.keys(elem)[0]) {
        elem[Object.keys(elem)[0]] = el[Object.keys(el)[0]]
      }
    }
  }
  return arr2
}

export const checkNameModelHandler = (checkerData) => {
  const {listCollectionsFromConfig, successDocsModelsEnNames, inputNamesCollection, selectNamesCollection, setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage} = checkerData
  // console.log(inputNamesCollection, selectNamesCollection)
  const collectionsName = listCollectionsFromConfig.reduce((arr, el) => {
    arr.push({[el]: el});
    return arr
  }, [])
  const errorCheck = listCollectionsFromConfig.reduce((arr, current) => {
    if (!successDocsModelsEnNames.includes(current)) {
      arr.push(current)
    }
    return arr
  }, [])
  return async (e) => {
    e.preventDefault()
    console.log('Кнопка работает')
    if (inputNamesCollection.length || selectNamesCollection.length || errorCheck.length) {
      if (inputNamesCollection.length && !selectNamesCollection.length) {
        await postPrepareInfo(checkerArr(inputNamesCollection, collectionsName).reduce((arr, el) => {
          arr.push(el[Object.keys(el)[0]]);
          return arr
        }, []), setLoaderUse, setErrorMsg, setPrepareInfo)
      }
      if (selectNamesCollection.length && !inputNamesCollection.length) {
        await postPrepareInfo(checkerArr(selectNamesCollection, collectionsName).reduce((arr, el) => {
          arr.push(el[Object.keys(el)[0]]);
          return arr
        }, []), setLoaderUse, setErrorMsg, setPrepareInfo)
      }
      if (inputNamesCollection.length && selectNamesCollection.length) {
        await postPrepareInfo(checkerArr(inputNamesCollection, selectNamesCollection).reduce((arr, el) => {
          arr.push(el[Object.keys(el)[0]]);
          return arr
        }, []), setLoaderUse, setErrorMsg, setPrepareInfo)
        
      }
    }
    else setSecondStage(true)
  }
}