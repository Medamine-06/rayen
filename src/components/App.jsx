import '../styles/App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Calendar from './Calendar.jsx'
import { useState } from 'react'
import taskService from '../services/TaskService';

function App() {
  
  const [week, setWeek] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [session, setSession] = useState(null);
  

  const fetchTasks = async (week) => {
    try {
      // Fetch tasks based on the week
      const allTasks = await taskService.getAllTasks(week); // Pass week if needed
      console.log("Fetched tasks for week", week, ":", allTasks);
      setTasks(allTasks); // Update the state with fetched tasks
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return (
    <>
      <Header week={week} session={session} setSession={setSession} setWeek={setWeek} fetchTasks={fetchTasks} />
      <Calendar week={week} tasks={tasks} session={session}  />
      <Footer />
    </>
  )
}

export default App
