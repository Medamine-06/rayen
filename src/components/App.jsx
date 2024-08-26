
import '../styles/App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Calendar from './Calendar.jsx'
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
