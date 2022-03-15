import './App.css';
import Loader from "react-loader-spinner";
import {useState, useEffect, useMemo} from "react";
import {getPrepareInfo} from "./Utils/getPrepareInfo"
import {
  Container,
  Href,
  InfoFooter,
  Footer,
  Content,
  HeaderText,
  LoaderWrapper,
  Header,
  Card
} from "./components/UIcomponents";
import Main from "./components/Main";
import ViewError from "./components/ViewError";
import ViewProcessInfo from "./components/ViewProcessInfo";
import Completed from "./components/Completed";
import {cancelHandler} from "./Handlers/cancelHandler";
import {startConvertHandler} from "./Handlers/startConvertHandler";
import FirstStage from "./components/FirstStage/FirstStage";
import SecondStage from "./components/SecondStage/SecondStage";
import ModelCard from "./components/ModelCard/ModelCard";

function App() {
  const [loaderUse, setLoaderUse] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [convertProcess, setConvertProcess] = useState(null)
  const [resultFetch, setResultFetch] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [prepareInfo, setPrepareInfo] = useState([])
  const [secondStage, setSecondStage] = useState(false)
  const [statusConvert, setStatusConvert] = useState(false)
  const [startConvertStatus, setStartConvertStatus] = useState(false)
  const [startStateListNamesByConfigs, setStartStateListNamesByConfigs] = useState(null)

  // console.log(prepareInfo)
  // const {newModelsToFront: {models: newModels}, oldModelsToFront: {models: oldModels}} = prepareInfo
  // const [stateData, setStateData] = useState({newModels, oldModels})
  const states = {
    loaderUse,
    setLoaderUse,
    visibleModal,
    setVisibleModal,
    convertProcess,
    setConvertProcess,
    resultFetch,
    setResultFetch,
    errorMsg,
    setErrorMsg,
    prepareInfo,
    setPrepareInfo,
    statusConvert,
    setStatusConvert,
    startConvertStatus,
    setStartConvertStatus,
    secondStage,
    setSecondStage,
    startStateListNamesByConfigs,
    setStartStateListNamesByConfigs
  }
  console.log(errorMsg)
  useEffect(() => {
      setLoaderUse(true)
      setVisibleModal(false)
      setErrorMsg(null)
      try {
        (async () => {
          setStatusConvert(false)
          setStartConvertStatus(false)
          await getPrepareInfo(setErrorMsg, setPrepareInfo, setLoaderUse, startStateListNamesByConfigs, setStartStateListNamesByConfigs)
        })()
      } catch (e) {
        setErrorMsg(e.message)
      }
    },
    [])
  const onStart = async () => {
    await startConvertHandler(states)
  }
  const onCancel = async () => {
    await cancelHandler(states)
  }
  const optionsModels = prepareInfo?.newModelsToFront?.models.reduce((arr, el) => {arr.push({label: el.name, value: [el.name, el.id, el.type]}); return arr}, [])
  console.log('PREPARE INFO', prepareInfo)
  console.log('BY APP', prepareInfo?.comparedModels?.models)
  return (
    <>
      <Container>
        <Header>
          <HeaderText>Конвертер базы</HeaderText></Header>
        <Content>
          <Card>
            {prepareInfo?.comparedModels?.models.length ? <ModelCard data={prepareInfo} setPrepareInfo={setPrepareInfo} options={optionsModels} setErrorMsg={setErrorMsg} errorMsg={errorMsg}/> :null}
            {!statusConvert && startConvertStatus ?
              <ViewProcessInfo convertProcess={convertProcess} allQty={prepareInfo.documentsLength}/> : null}
            {!loaderUse && prepareInfo.documentsLength && !errorMsg && !statusConvert && !secondStage ?
              // <Main data={prepareInfo} onStart={onStart}/> : null
              <FirstStage data={prepareInfo} states={states}/> : null
            }
            {!loaderUse && prepareInfo.documentsLength && !errorMsg && !statusConvert && secondStage ?
              // <Main data={prepareInfo} onStart={onStart}/> : null
              <SecondStage data={prepareInfo} states={states}/> : null
            }
            {!loaderUse && visibleModal && convertProcess === resultFetch?.listDocuments?.length && !errorMsg ?
              <Completed listCollection={resultFetch?.listCollection}
                         dataSuccessModel={prepareInfo.successDocsFromModels}
                         qtyNotes={resultFetch?.listDocuments?.length} nameRusList={prepareInfo.nameRusList}/> : null}
            {loaderUse ? <LoaderWrapper style={{"text-align": "center"}}>
              <p style={{"position": "fixed", "margin-top": "140px", "margin-left": "30px"}}>Подготовка... Сбор
                информации...</p>
              <Loader type="Puff"
                      color="#00BFFF"
                      height={300}
                      width={300}
              />
            </LoaderWrapper> : null
            }
            {errorMsg ? <ViewError errorMsg={errorMsg} onCancel={onCancel}/> : null}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </Card>
        </Content>
        <Footer>
          <InfoFooter>
            © 2009-2021
            <Href>
              <a href="https://viar-module.ru/" target="_blank">ВИАР ИТ</a>
            </Href>
          </InfoFooter>
        </Footer>
      </Container>
    </>
  );
}

export default App;
