import CardContainer from './components/ProductCards'
import { BuyModalWindow } from './components/ModalWindows'
import './App.css'



function App() {


  return (
    <>
    <BuyModalWindow showModal={true} toggle={()=>null}/>
  <CardContainer promo={false} location='./cards.json' showBuyModal={()=>null}/>
    </>
  )
}

export default App
