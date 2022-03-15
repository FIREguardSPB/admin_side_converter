import {getProcessConvert} from "../Utils/getProcessConvert";
import {startConvert} from "../Utils/startConvert";

export const startConvertHandler = async (states) => {
  const {setStatusConvert, setStartConvertStatus, setVisibleModal, setErrorMsg, setConvertProcess, prepareInfo, convertProcess, setLoaderUse, setResultFetch} = states
  setStatusConvert(false)
  setStartConvertStatus(false)
  setVisibleModal(false)
  setErrorMsg(null)
  await getProcessConvert(setConvertProcess, prepareInfo.documentsLength, convertProcess)
  await startConvert(setLoaderUse, setErrorMsg, setResultFetch, setVisibleModal, setStatusConvert, setStartConvertStatus)
}