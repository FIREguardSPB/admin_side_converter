import React, {useCallback, useMemo, useState} from 'react';
import Select from 'react-select';
import {customStyles} from "../../Styles/selectStyles";
import {StartButton} from "../UIcomponents";
import {onInput} from "../../Handlers/inputHandler";
import {checkNameModelHandler} from '../../Handlers/checkNameModelHandler'
const FirstStage = ({data, states}) => {
  const {setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage, startStateListNamesByConfigs} = states
  console.log(startStateListNamesByConfigs, '<<<==== это стартовый список')
  const {listCollectionsFromConfig, listCollectionsFromNewConfig, successDocsModelsEnNames} = data
  const [inputNamesCollection, setInputNamesCollection] = useState([])
  const [selectNamesCollection, setSelectNameCollection] = useState([])
  const [error, setError] = useState(false)
  // console.log(data.successDocsModelsEnNames, '=======================')
  const checkerData = {listCollectionsFromConfig, successDocsModelsEnNames, inputNamesCollection, selectNamesCollection, setLoaderUse, setErrorMsg, setPrepareInfo, setSecondStage}
  const options = listCollectionsFromNewConfig.reduce((arr, current) => {
    arr.push({label: current, value: current});
    return arr
  }, [])
  return (
    <>
      Если коллекция не найдена в БД, то Вы можете выбрать соответствующее название коллекции из списка или вписать его
      вручную - в случае отсутствия необходимой коллекции в списке.
      Не мняйте значения без необходимости.
      {/*<ul>*/}
      {/*  <ul>*/}
      {/*    {listCollectionsFromConfig.map((el, i) => <li key={i}*/}
      {/*                                                  style={data.successDocsModelsEnNames.includes(el) ? {"color": "green"} : {"color": "red"}}> {`${el} - ${data.successDocsModelsEnNames.includes(el) ?*/}
      {/*      'коллекция в БД найдена' : 'колекция в БД не найдена'}`} <Select*/}
      {/*      styles={customStyles}*/}
      {/*      name={el}*/}
      {/*      options={options}*/}
      {/*      placeholder={el}*/}
      {/*      containerWidth='250px'*/}
      {/*      onChange={onInput(selectNamesCollection,setSelectNameCollection)}*/}
      {/*    /><input type={"text"} name={el} style={{'width': '245px', 'height': '30px'}}*/}
      {/*             placeholder={'Ручной ввод здесь'}*/}
      {/*             onChange={onInput(inputNamesCollection, setInputNamesCollection, 1)}*/}
      {/*    /></li>)}*/}
      {/*  </ul>*/}
      {/*</ul>*/}
      <StartButton onClick={checkNameModelHandler(checkerData)}>Дальше</StartButton>
    </>
  );
};

export default FirstStage;