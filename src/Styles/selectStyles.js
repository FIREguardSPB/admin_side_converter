export const customStyles = {
  indicatorsContainer: (provided, state) => ({
    ...provided,
    // width: '250px',
    // border: '1px dotted pink',
    height: '20px',
    // // color: state.selectProps.menuColor,
    // margin: 0,
    // padding: 0
    
  })
  ,
  ValueContainer: (provided, state) => ({
    ...provided,
    // width: '250px',
    // border: '1px dotted pink',
    height: '20px',
    // color: state.selectProps.menuColor,
    margin: 0,
    padding: 0
    
  })
  
  ,
  input: (provided, state) => ({
    ...provided,
    width: '250px',
    border: '1px dotted pink',
    height: '20px',
    // color: state.selectProps.menuColor,
    margin: 0,
    padding: 0
    
  }),
  container: (provided, state) => ({
    ...provided,
    width: state.selectProps.containerWidth,
    border: '1px dotted pink',
    height: '20px',
    // color: state.selectProps.menuColor,
    // padding: 20,
    marginBottom: 20,
    padding: 0
    
  }),
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    border: '1px dotted pink',
    color: state.selectProps.menuColor,
    padding: 20,
  }),
  
  control: (provided, state) => ({
    ...provided,
    width: '250px',
    height: '20px',
    boxSizing: 'border-box',
    padding: 0,
    margin: 0
  }),
  // control: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   width: 250,
  //   height: 20
  // }),
  
  option: (provided, state) => ({
    ...provided,
    width: '250px',
    border: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 0,
    margin: 0
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const height = '20px'
    return {...provided, opacity, transition, height};
  }
}