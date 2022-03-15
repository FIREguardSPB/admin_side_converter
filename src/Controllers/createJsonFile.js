export const createJsonFile = async (data, nameFile, fieldName, setSaveFileStatus) => {
  const dataSend = JSON.stringify({[fieldName] : data, nameFile})
fetch('/api/createjson', {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: dataSend
})
  .then(result => {
    if (result.status === 500) {
      // setErrorMsg("Ошибка конвертации, проверьте соединение и запустите проверку еще раз");
      console.log('errror')
    } else {
      if(setSaveFileStatus)
      setSaveFileStatus(true)
    }
  })
  // .then(res => {
  //   if (res.statusConvert === 200) {
  //     setResultFetch(res);
  //     setVisibleModal(true)
  //     setStatusConvert(true)
  //     setStartConvertStatus(false)
  //   }
  //   if (res.statusConvert === 500) {
  //     setErrorMsg(res.errMsg);
  //     setVisibleModal(false);
  //   }
  // })
  // .catch((e) => {
  //   setErrorMsg("Ошибка конвертации, проверьте соединение и запустите проверку еще раз");
  // })
  // .finally(() => setLoaderUse(false))
}