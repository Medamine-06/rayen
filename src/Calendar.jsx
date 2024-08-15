import React, { useState } from 'react';
import './Calendar.css';
import TaskDialog from './TaskDialog';
import Textarea from './Textarea';

const Calendar = (props) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date();
  today.setDate(today.getDate() + props.week * 7);

  const formatDate = (baseDate, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);
    return {
      date: `${date.getDate()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`,
      day: daysOfWeek[date.getDay()],
    };
  };

  const dates = Array.from({ length: 7 }).map((_, index) => formatDate(today, index));

  const [tasks, setTasks] = useState(Array(7).fill(Array(7).fill('')));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);

  const handleOpenDialog = (dayIndex, taskIndex) => {
    setActiveDayIndex(dayIndex);
    setActiveTaskIndex(taskIndex);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (newTask) => {
    const updatedTasks = tasks.map((dayTasks, dayIndex) =>
      dayIndex === activeDayIndex
        ? dayTasks.map((task, taskIndex) =>
            taskIndex === activeTaskIndex ? newTask : task
          )
        : dayTasks
    );
    setTasks(updatedTasks);
    setIsDialogOpen(false);
  };

  return (
    <table className="calendar">
      <thead>
        <tr>
          {dates.map((dateObj, index) => (
            <th key={index} className="date-cell">
              <div className="date">{dateObj.date}</div>
              <div className="day">{dateObj.day}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(7).fill(0).map((_, rowIndex) => (
          <tr key={rowIndex} className="task-row">
            {tasks.map((dayTasks, dayIndex) => (
              <td key={dayIndex} className="task-cell">
                <Textarea
                  value={dayTasks[rowIndex]}
                  onClick={() => handleOpenDialog(dayIndex, rowIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      {isDialogOpen && (
        <TaskDialog
          task={tasks[activeDayIndex][activeTaskIndex]}
          onSave={handleSaveTask}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </table>
  );
};

export default Calendar;
