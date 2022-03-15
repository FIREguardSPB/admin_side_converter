import React from 'react';
import {Button, ModalWarning} from "./UIcomponents";

export const ViewError = ({errorMsg, onCancel}) => {
  return (
    <>
      <ModalWarning style={{"text-align": "center"}}>
        <div className={'textError'} style={{'margin-top' : '50px'}}>
        {`${errorMsg}`}
        </div>
        <Button onClick={onCancel} style={{'background': ' #f44336'}}>Отмена</Button>
      </ModalWarning>
    </>
  );
};

export default ViewError;