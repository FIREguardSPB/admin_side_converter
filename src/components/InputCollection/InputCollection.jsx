import React, {useMemo} from 'react';
import {Input} from "../UIcomponents";

const InputCollection = ({collection, copyData, setStateData, setCollectionInput, collectionInput}) => {
  const copyCollections = Object.assign({}, collectionInput)
  // const inputRefs = useMemo(() => Array(length).fill(0).map(i=> React.createRef()), []);
  // const handleChange = index => (e) => {
  //   //onChange(e); // don't know about the logic of this onChange if you have multiple inputs
  //   if (inputRefs[index + 1]) inputRefs[index + 1].current.focus();
  // }
  console.log(collectionInput)
  const inputCollectionHandler = (e) => {
    // const {collections} = copyData
    // const copyCollections = Object.assign({}, copyCollections)
    copyCollections?.forEach((collection) => {
      // console.log(collection.old_id, selectData.name)
      if (copyCollections.new_name === e.target.name) {
        copyCollections.new_id = e.target.value
      }
    })
    const updateData = Object.assign({}, copyCollections)
    setCollectionInput(updateData)
    console.log(collectionInput)
    
  }
  const onInputCollection = (e) => {
    inputCollectionHandler(e)
    
  }
  // value={copyCollections.new_id || ''}
  const input = (collectionInput) => <Input name={collectionInput.old_name} key={Math.random() + Math.random()}
                                  onChange={inputCollectionHandler}   placeholder={collectionInput.new_id} value={copyCollections.new_id || ''}/>
  return (
    <>
      {collectionInput.new_id}
      {input(collectionInput)}
    </>
  );
};

export default InputCollection;