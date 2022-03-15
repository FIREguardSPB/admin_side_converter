import React, {useState} from 'react';
import Select from 'react-select';
import {customStyles} from "../../Styles/selectStyles";
import {onInput} from "../../Handlers/inputHandler";
import {StartButton} from "../UIcomponents";
import {checkNameModelHandler} from "../../Handlers/checkNameModelHandler";

const SecondStage = ({data, states}) => {
  const {setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage, startStateListNamesByConfigs} = states
  const {listCollectionsFromConfig, listCollectionsFromNewConfig, successDocsModelsEnNames} = data
  const [inputNamesCollection, setInputNamesCollection] = useState([])
  const [selectNamesCollection, setSelectNameCollection] = useState([])
  const [selectState, setSelectState] = useState([])
  console.log(selectState)
  const checkerData = {listCollectionsFromConfig, successDocsModelsEnNames, inputNamesCollection, selectNamesCollection, setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage}
  //
  // {listCollectionsFromConfig, successDocsModelsEnNames, inputNamesCollection, selectNamesCollection, setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage} = data
  // const checkerData = listCollectionsFromConfig, successDocsModelsEnNames, inputNamesCollection, selectNamesCollection, setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage
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
  const diffArr = (arr1, arr2) => {
    return arr1.reduce((arr, el) => {
      if (!arr2.includes(el)) {
        arr.push(el);
      }
      return arr
    }, [])
  }
  const result = []
 
  // const diffAllArr = (arrs1, arrs2) => {
  //  arrs1.forEach((arr) => {if (arrs2)})
  //   }
  // }
  const {
    fieldsByNewModels,
    fieldsByOldModels
  } = data
  //имена старых моделей
  const arrNamesNewsModels = fieldsByNewModels.reduce((arr, el) => {
    arr.push({[el]: el});
    return arr
  },[])
  // for (let model of fieldsByNewModels){
  //   if(arrNamesOldsModels.includes(model[0])){
  //
  //   }
  // }
  // console.log(arrNamesOldsModels, 'opopopopo')

  
  const options = fieldsByNewModels.reduce((arr, current) => {
    console.log(Object.keys(current)[0])
    arr.push({label: Object.keys(current)[0], value: Object.keys(current)[0]});
    return arr
  }, [])
  console.log(fieldsByOldModels, fieldsByNewModels, '>>>>>>>>> on 2 stage data getting')
  console.log(selectState, 'select state')

  // console.log(checkerArr(fieldsByOldModels, selectState))
  // console.log('diff', diffAllArr(fieldsByOldModels, fieldsByNewModels))
  const onButton = (e) => {
    e.preventDefault()
    console.log(checkerArr(selectState, arrNamesNewsModels).reduce((arr, el) => {
      arr.push(el[Object.keys(el)[0]]);
      return arr
    }, []))
  }
  const onSelect = (e, data) => {
    console.log(data.name, e.value)
    fieldsByOldModels.forEach((el) => {
      // if (el[Object.keys(el[0]) === data.name]){
      //
      // }
      console.log(Object.keys(el)[0], data.name)
      // fieldsByOldModels[[Object.keys(el[0])]] = data.name
    })
    // console.log(fieldsByOldModels)
  }
  return (
    <>
      Сопоставьте представленные старые модели с новыми из выпадающего списка:
      <ul>
        {fieldsByOldModels.map((elem, i) =>
          (elem !== 'none' ?
            // <li key={i}>{elem[0]}
              <li key={i}>{Object.keys(elem)[0]}
            <Select
              styles={customStyles}
              name={Object.keys(elem)[0]}
              options={options}
              placeholder={'Выберите новую модель'}
              containerWidth='250px'
              onChange={onInput(selectState, setSelectState)}
            />
          </li> : null)
        )}
      
      </ul>
      <StartButton onClick={onButton}>Дальше</StartButton>
    </>
  );
};

export default SecondStage;