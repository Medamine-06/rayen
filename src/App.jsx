
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Calendar from './Calendar'
import {useState} from'react'
import { setMonth } from 'date-fns'


function App() {
  const [week, setweek] = useState(0);

  const[MonthName,SetMonthName]=useState("January");

  return (
    <>
    <Header setweek={setweek} />
    <Calendar week={week} />
    <Footer/>
   
   
    </>
  )
}

export default App
