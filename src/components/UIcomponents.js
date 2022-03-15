import styled from "styled-components";


export const Container = styled.div`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //flex-direction: column;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }

  :before {
    box-sizing: inherit;
  }

  :after {
    content: "";
    display: table;
    clear: both;
  }
`
export const Header = styled.div`
  //text-align: center;
  //width: 200px;
  //height: 100px;
  //line-height: 100px;
  //box-sizing: border-box;
  //font-size: 20px;
  display: block;
  padding: 12px 0;
  color: #cdbfe3;
  text-align: left;
  background-color: #267fdb;
  margin-top: 32px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-tap-highlight-color: transparent;

  :before {
    box-sizing: inherit;
  }
`
export const MainMessage = styled.div`
  //text-align: center;
  //width: 200px;
  //height: 200px;
  //font-size: 14px;
  //box-sizing: border-box;
  display: block;
  text-align: -webkit-center;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

`
export const HeaderText = styled.div`
  @media {
    min-width: 768px
  };
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
  color: #fff;
  transition: font-size .5s, height .5s;
  line-height: 2rem;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`
export const Content = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: block;
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1.5;
  color: #373a3c;
`
export const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  border-radius: 2px;
  color: rgba(0, 0, 0, .87);
  background: #fff;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .19)
  margin-bottom: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  -webkit-tap-highlight-color: transparent;
`
export const WrapperMainText = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: block;
  text-align: -webkit-center;
  color: rgba(0, 0, 0, .87);
  

`
export const Big = styled.div`
  -webkit-tap-highlight-color: transparent;
  font-size: larger;
  color: rgba(0, 0, 0, .87);
  font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
`

export const Strong = styled.div`
  font-weight: bolder;
  -webkit-tap-highlight-color: transparent;

`
export const StartButton = styled.button`
  margin-left: 43%;
  background-color: #4caf50;
  width: 150px;
  height: 50px;
`
export const LoaderWrapper = styled.div`
  //display: flex;
  //flex-direction: column;
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 300px;
  height: 300px;
  z-index: 4;
`
export const ModalWindow = styled.div`
  position: inherit;
  width: 200px;
  height: 200px;
  background: antiquewhite;
  z-index: 10;
`
export const ModalWarning = styled.div`
  margin-left: 20%;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: fixed;
  width: 600px;
  height: 200px;
  background: #f5f5f5;
  z-index: 3;
`
export const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
  margin-right: 10px;
`
export const Footer = styled.div`
  text-align: center;
  font-size: 85%;
  margin-bottom: 16px;
  display: block;
  -webkit-tap-highlight-color: transparent
`

export const InfoFooter = styled.div`
  margin-bottom: 2px;
  margin-top: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`
export const Href = styled.div`
  color: #267fdb;
  touch-action: manipulation;
`
export const CardsWrapper = styled.div`
  //width: 800px;
  //border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const CardOneWrapper = styled.div`
  min-width: 800px;
  margin-top: 30px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: lightcyan;
`
export const RowCard = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`
export const ItemRow = styled.div`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.125);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const ItemCard = styled.div`
  min-width: 400px;
  margin-left: 5px;
  padding-left: 15px;
  padding-top: 5px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.125);
  flex-direction: column;
  justify-content: space-around;
  align-content: space-between;
  margin-right: 20px;
`
export const AbsoluteModalWindow = styled.div`
  margin-top: 300px;
  position: fixed;
  width: 200px;
  height: 200px;
`
export const Input = styled.input`
height: 30px;
`