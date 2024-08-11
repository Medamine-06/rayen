
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Calendar from './Calendar'
import {useState} from'react'




function App() {
  
  const [week0, setweek] = useState(0);
  return (
    <>
    <Header setweek={setweek} week={week0}/>
    <Calendar week={week0}/>
    <Footer/>
   
    </>
  )
}

export default App
