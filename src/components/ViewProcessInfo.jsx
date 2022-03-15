import React from 'react';
import styled from "styled-components";
import {ModalWarning} from "./UIcomponents";

const LineProcess = styled.div`
  z-index: 10;
  box-sizing: border-box;
  margin: 50px auto;
  padding-bottom: 0;
  //margin: 0 auto;
  width: 300px;
  height: 10px;
  border: 1px solid #000000;
  border-radius: 2px;
  //background-image: linear-gradient(to right, #228B22 , #228B22 var(--p,0%),#FFFFFF var(--p,0%));
`
const ViewProcessInfo = ({convertProcess, allQty}) => {
  // let percentLine = Math.trunc(!convertProcess ? 0 : convertProcess / !allQty ? 0 : allQty * 100)
  //Math.trunc(101 * Math.random())
  // console.log(percentLine)
  return (
    <>
      {/*<ModalWarning>*/}
        <LineProcess
          style={{"background-image": `linear-gradient(to right, #4caf50 , #4caf50 ${Math.trunc(convertProcess / allQty * 100)}%,#FFFFFF ${Math.trunc(convertProcess / allQty * 100)}%)`}}>
        <p style={{"text-align": "center"}}>  Конвертировано: {convertProcess} из {allQty}</p>
        </LineProcess>
        
      {/*</ModalWarning>*/}
    </>
  );
};

export default ViewProcessInfo;