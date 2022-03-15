export const getPrepareInfo = async (setErrorMsg, setPrepareInfo, setLoaderUse, startStateListNamesByConfigs, setStartStateListNamesByConfigs) => {
  setLoaderUse(true)
  await
    fetch('/api/prepareInfo', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(res => {
        console.log(res);
        //если ответ с ошибкой то записать в стэйт ошибок
        if (res.statusConvert === 500) {
          setErrorMsg(res.errMsg)
        } else {
          setPrepareInfo(res)
          if(!startStateListNamesByConfigs){
            setStartStateListNamesByConfigs(res)
            console.log('start state copyed!!', startStateListNamesByConfigs)
          }
        }
      })
      .then(() => console.log('copy start state', startStateListNamesByConfigs))
      .finally(() => setLoaderUse(false))
}