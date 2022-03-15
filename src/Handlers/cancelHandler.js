import {killServerDB} from "../Utils/killServerDB";
import {getPrepareInfo} from "../Utils/getPrepareInfo";

export const cancelHandler = async (states) => {
  try {
    const {setStatusConvert, setStartConvertStatus, setErrorMsg, setVisibleModal, setPrepareInfo, setLoaderUse} = states
    setStatusConvert(false)
    setStartConvertStatus(false)
    setErrorMsg(null);
    setVisibleModal(false)
    await killServerDB()
    await getPrepareInfo(setErrorMsg, setPrepareInfo, setLoaderUse)
  }
  catch (e) {
    throw {statusConvert: 500, errMsg: e}
  }
}