import React from 'react';
import {Strong, Big, WrapperMainText, StartButton} from "./UIcomponents";
import styled from "styled-components";

const CollectionName = styled.div`
  width: 500px;
  height: 20px;
`
export const Main = ({data, onStart}) => {
  console.log(data)
  return (
    <>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {data.nameRusList ? <WrapperMainText>
        <Big>
          <Strong>Найдены следующие модели в конфигурационном файле: <br/>
            <ul style={{"color": "#4caf50", "list-style-position": "inside", "text-align": "left", "margin-left": "20%"}}>
            {/*<p style={{"color": "#4caf50"}}>*/}
            {data.nameRusList.map((el, i) => (
              <li key={i + new Date()} style={data.successDocsFromModels.includes(el) ? {"color": "green"} : {"color": "red"}}>{`"${el}" - ${data.successDocsFromModels.includes(el) ?
              'коллекция в БД найдена' : 'колекция в БД не найдена'}`}</li>
            
            ))}
            {/*</p>*/}
            </ul>
            <br/>
            
            
            Общее количество записей для конвертации: <p style={{"color": "#4caf50"}}> {data.documentsLength}
            </p>
          </Strong>
        </Big>
      </WrapperMainText> : null}
      <br/><br/>
      <StartButton onClick={onStart}>Конвертировать</StartButton>
    </>
  );
};

export default Main;