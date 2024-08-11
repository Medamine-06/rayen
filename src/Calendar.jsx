import React, { useState } from 'react';
import './Calendar.css';
import TaskDialog from './TaskDialog';
import Textarea from './Textarea';

const Calendar = (props) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  const today = new Date();
  today.setDate(today.getDate()+ props.week * 7);

  const formatDate = (baseDate, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);
    return {
      date: `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString()}`,
      day: daysOfWeek[date.getDay()],
    };
  };

  const dates = Array.from({ length: 7 }).map((_, index) => formatDate(today, index));

  const [tasks, setTasks] = useState(Array(7).fill(''));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(null);

  const handleOpenDialog = (index) => {
    setActiveDayIndex(index);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (newTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[activeDayIndex] = newTask;
    setTasks(updatedTasks);
    setIsDialogOpen(false);
  };
  

  return (
    
    <div className="calendar">
      <div className="calendar-header">
        {dates.map((dateObj, index) => (
          <div key={index} className="date-cell">
            <div className="date">{dateObj.date}</div>
            <div className="day">{dateObj.day}</div>
          </div>
        ))}
      </div>
      <div className="calendar-body">
        {tasks.map((task, index) => (
          <div key={index} className="day-cell">
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            <Textarea value={task} onClick={() => handleOpenDialog(index)}/>
            
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <TaskDialog
          task={tasks[activeDayIndex]}
          onSave={handleSaveTask}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
