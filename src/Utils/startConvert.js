export const startConvert = async (setLoaderUse, setErrorMsg, setResultFetch, setVisibleModal, setStatusConvert, setStartConvertStatus) => {
  setLoaderUse(true)
  setStartConvertStatus(true)
  fetch('/api/convert', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      if (result.status === 500) {
        setErrorMsg("Ошибка конвертации, проверьте соединение и запустите проверку еще раз");
      } else {
        return result.json()
      }
    })
    .then(res => {
      if (res.statusConvert === 200) {
        setResultFetch(res);
        setVisibleModal(true)
        setStatusConvert(true)
        setStartConvertStatus(false)
      }
      if (res.statusConvert === 500) {
        setErrorMsg(res.errMsg);
        setVisibleModal(false);
      }
    })
    .catch((e) => {
      setErrorMsg("Ошибка конвертации, проверьте соединение и запустите проверку еще раз");
    })
    .finally(() => setLoaderUse(false))
}