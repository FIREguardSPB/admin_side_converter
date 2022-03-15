// import {killServerDB} from "./killServerDB";

export const getProcessConvert = (setConvertProcess, qtyNotes, result ) => {
  console.log('start foo view process')
  if (result !== qtyNotes) {
    if (result > qtyNotes) {
      return setConvertProcess(qtyNotes)
    } else {
      console.log('Запрос количества уже записанных')
      const fetchTimeOut = setTimeout(() => {
  try {
    fetch('/api/qtynotes', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(result => {
        console.log('Записываем количество записанных элементов', result);
        setConvertProcess(result);
        clearTimeout(fetchTimeOut)
        getProcessConvert(setConvertProcess, qtyNotes, result)
      })
  }
  catch (e) {
    setConvertProcess(result)
    return result
  }
        }, 100)
    }
  }
  else return result
}