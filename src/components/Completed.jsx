import React from 'react';
import {Big, ModalWindow, Strong, WrapperMainText} from "./UIcomponents";

const Completed = ({listCollection, qtyNotes, nameRusList, dataSuccessModel}) => {
  return (
    <>
      <WrapperMainText style={{"margin-top": "80px"}}>
        <Strong>
          <Big>
            {/*<ModalWindow>*/}
            Произведена конвертация записей из коллекции/ий: <ul style={{"color": "#4caf50", "list-style-position": "inside", "text-align": "left", "margin-left": "40%"}}> {nameRusList.map((el, i) => (dataSuccessModel.includes(el) ? <li key={i + new Date()}>{el}</li> : null))} </ul>
            Количество обработанных записей: <p style={{"color": "#4caf50"}}> {qtyNotes}</p>
            {/*</ModalWindow>*/}
          </Big>
        </Strong>
      </WrapperMainText>
    </>
  );
};

export default Completed;