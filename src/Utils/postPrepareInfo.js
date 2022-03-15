export const postPrepareInfo = async (list, setLoaderUse, setErrorMsg, setPrepareInfo) => {
  setLoaderUse(true)
  console.log(list)
  await
    fetch('/api/prepareInfo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    })
      .then(result => result.json())
      .then(res => {
        console.log(res, '<==== Данные после проверки');
        // если ответ с ошибкой то записать в стэйт ошибок
        if (res.statusConvert === 500) {
          setErrorMsg(res.errMsg)
        } else {
          setPrepareInfo(res)
        }
      })
      .finally(() => setLoaderUse(false))
}