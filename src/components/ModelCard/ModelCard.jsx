import React, {useCallback, useEffect, useRef, useState} from 'react';
import Select from "react-select";
import {customStyles} from "../../Styles/selectStyles";
import {
  AbsoluteModalWindow, Button,
  CardOneWrapper,
  CardsWrapper, Input,
  ItemCard, ModalWarning, ModalWindow,
  RowCard,
  StartButton
} from "../UIcomponents";
import {selectCompareHandler} from "../../Handlers/selectCompareHandler";
import {checkerExistFields} from "../../Utils/checkerExistFields";
import {createJsonFile} from "../../Controllers/createJsonFile";
import {filledChecker} from "../../Utils/filledChecker";
import {selectHandlerCollect} from "../../Handlers/selectHandlerCollect";
import {getOptions} from "../../Utils/getOptions";


const ModelCard = ({data, options, setErrorMsg, errorMsg}) => {
  
  const {
    comparedModels: {models},
    newModelsToFront: {models: newModels},
    oldModelsToFront: {models: oldModels},
    comparedCollections: {collections},
    namesCollectionsFromDb
  } = data
  const [stateData, setStateData] = useState({newModels, oldModels, models, collections})
  const [saveFileStatus, setSaveFileStatus] = useState(false)
  const [alert, setAlert] = useState(false)
  const copyData = Object.assign({}, stateData)
  const optionsMongodbCollections = namesCollectionsFromDb?.reduce((arr, collection) => {
    arr.push({label: collection, value: collection});
    return arr
  }, [])
  
  const alertWindow = () => alert ?
    <ModalWarning>ВНИМАНИЕ! <br/> Заполнены не все поля. <br/> Если Вы уверены в корректности заполнения полей и хотите
      сохранить изменения, то нажмите кнопку "Записать", если Вы хотите откорректировать изменения, то нажмите кнопку
      "Отмена".
      <RowCard><Button style={{'background': 'green'}} onClick={async () => {
        await createJsonFile(stateData.collections, 'convert_collections', 'collections');
        await createJsonFile(stateData.models, 'convert_data', 'models', setSaveFileStatus);
        setTimeout(() => fetch('/api/zipfile', {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }), 300)
        // .then(result => {
        //   if (result.status === 500) {
        //     // setErrorMsg("Ошибка конвертации, проверьте соединение и запустите проверку еще раз");
        //     console.log('errror')
        //   })
        setAlert(false);
      }}>Записать</Button><Button style={{'background': 'red'}}
                                  onClick={() => setAlert(false)}>Отмена</Button></RowCard>
    </ModalWarning> : null
  
  const onSave = async (e) => {
    e.preventDefault()
    const checkFilled = filledChecker(stateData)
    if (!checkFilled) {
      setAlert(true)
    } else {
      await createJsonFile(stateData.collections, 'convert_collections', 'collections')
      await createJsonFile(stateData.models, 'convert_data', 'models', setSaveFileStatus)
    }
  }
  
  const onSelectCollection = useCallback((e, selectData) => {
    selectHandlerCollect(selectData, e.value, setStateData, copyData)
  }, [data])
  
  const onInputCollection = (e) => {
    const {collections} = copyData
    collections.forEach((collection) => {
      if (collection.new_name === e.target.name) {
        collection.new_id = e.target.value
      }
    })
    setStateData(copyData)
    
  }
  const inputHandlerCollection = useCallback((e, copyData) => onInputCollection(e, copyData), [copyData])
  
  const modalWindow = () => saveFileStatus ? <AbsoluteModalWindow>Файл сохранен</AbsoluteModalWindow> : null
  const input = (collection, i) => <Input name={collection.old_name} value={collection.new_id || ''}
                                          onChange={inputHandlerCollection} key={i}/>
  // if (collections) {
  const collectionsCompareBlock = () => stateData?.collections?.sort().map((collection, i) => < CardOneWrapper key={i}>
    <b>Сопоставление имен коллекций</b>
    <RowCard>
      <ItemCard>
        <b>Исходная коллекция</b>
        {collection.old_id}
        <Select
          key={i}
          styles={customStyles}
          options={optionsMongodbCollections}
          name={collection.old_name}
          placeholder={optionsMongodbCollections.includes(collection.old_id) ? collection.old_id :
            <b style={{'color': 'red'}}>Select</b>}
          onChange={onSelectCollection}
        />
      </ItemCard>
      <ItemCard>
        <b> Целевая коллекция</b>
        {input(collection, i)}
      </ItemCard>
    </RowCard>
  </CardOneWrapper>)

  const modelsCompareBlock = () => stateData?.models?.sort().map((model, i) => <CardOneWrapper key={Math.random()}>
    <RowCard>
      <ItemCard>
        <b>Исходная модель:</b>
        {model.old_name}</ItemCard>
      <ItemCard>
        <b>Целевая модель:</b>
        <Select key={model.id}
                styles={customStyles}
                name={model.old_name}
                options={options}
                placeholder={model.new_name !== '' ? <b style={{'color': 'green'}}>{model.new_name}</b> :
                  <b style={{'color': 'red'}}>No matched</b>}
                containerWidth='250px'
                onChange={selectCompareHandler(data, copyData, setStateData)}
        />
      </ItemCard>
    </RowCard>
    {/*//================================================FIELDS BLOCK*/}
    <RowCard>
      <ItemCard>
        <b>id исходной модели:</b> {model.old_id}<br/>
      </ItemCard>
      <ItemCard>
        <b> id целевой модели: </b>{model.new_id}
      </ItemCard>
    </RowCard>
    {/*</ul>*/}
    <b>Коллекция mongoDB: </b>
    <Select
      key={Math.random()}
      styles={customStyles}
      options={optionsMongodbCollections}
      name={model.old_name}
      placeholder={model.source_db ? model.source_db : <b style={{'color': 'red'}}>Select</b>}
      onChange={selectCompareHandler(data, copyData, setStateData, 'DB')}
    />
    <CardOneWrapper>
      {model?.fields?.sort().map(field => <RowCard key={Math.random()}> <ItemCard>
        <div><b> id исходного поля:</b> {field.old_id}</div>
        <div><b>name: </b>{field.old_name} </div>
      </ItemCard>
        <ItemCard>
          <div style={{'height': '30px'}}><b>id целевого поля: </b>{field.new_id}</div>
          <Select
            key={Math.random()}
            styles={customStyles}
            name={[field.old_name, field.old_id]}
            options={getOptions(newModels, model.new_name ? model.new_name : '')}
            placeholder={field?.new_name !== '' ? <b style={{'color': 'green'}}>{field.new_name}</b> :
              <b style={{'color': 'red'}}>No matched</b>}
            containerWidth='250px'
            onChange={selectCompareHandler(data, copyData, setStateData, 'fields', model.old_name, model.new_name)}
          />
        </ItemCard>
      </RowCard>)}
    </CardOneWrapper>
    {/*====================================================end fields block*/}
  </CardOneWrapper>)
  
  const saveButton = () => !errorMsg ? <StartButton style={{"margin-top": "40px"}} onClick={onSave}>
    Записать изменения
  </StartButton> : null
  
  if (models.length) {
    checkerExistFields(stateData, setStateData)
  }
  
  
  return (
    <>
      {modalWindow()}
      {alertWindow()}
      <CardsWrapper>
        {collectionsCompareBlock()}
        {modelsCompareBlock()}
      </CardsWrapper>
      {saveButton()}
    </>
  );
};

export default ModelCard;