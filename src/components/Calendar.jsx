import React, { useState, useEffect, useMemo } from 'react';
import '../styles/Calendar.css';
import TaskDialog from '../components/TaskDialog';
import Textarea from '../components/Textarea';
import taskService from '../services/TaskService'; // Import task service
import ObjectId from 'bson-objectid';

const Calendar = ({ week , session}) => {
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const { startDate, endDate } = useMemo(() => {
    const getWeekDateRange = (weekOffset) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + weekOffset * 7 - startDate.getDay() + 1); // Monday of the week
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Sunday of the week
      return { startDate, endDate };
    };

    return getWeekDateRange(week);
  }, [week]);


  const formatDate = (baseDate, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index);
    return {
      date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`,
      day: daysOfWeek[(date.getDay() + 6) % 7], // Adjust day index for Sunday
      isoDate: date.toISOString().split('T')[0] // ISO format for backend and display
    };
  };

  const dates = Array.from({ length: 7 }).map((_, index) => formatDate(startDate, index));

  const [tasks, setTasks] = useState(Array(7).fill(null).map(() => ({
    tasks: Array(5).fill({ task: '', id: null, isDone: false }),
    extraNotes: Array(5).fill({ note: '', id: null })
  })));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let allTasks;
        if (session) {allTasks = await taskService.getTasksByDateRangeByUserId(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0],session.id);}
        else allTasks = await taskService.getTasksByDateRange(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
        console.log("Fetched tasks:", allTasks);

        const numDays = 7;
        const numRows = 5;
        const organizedTasks = Array.from({ length: numDays }, () => ({
          tasks: Array.from({ length: numRows }, () => ({ task: '', id: null, isDone: false })),
          extraNotes: Array.from({ length: numRows }, () => ({ note: '', id: null }))
        }));

        allTasks.forEach((task) => {
          const taskDate = new Date(task.date);
          const dayIndex = (taskDate.getDay() + 6) % 7; // Adjust dayIndex to start from Monday

          // Find the first available row in the day
          const emptyRowIndex = organizedTasks[dayIndex].tasks.findIndex(rowTask => rowTask.task === '');
          if (emptyRowIndex !== -1) {
            organizedTasks[dayIndex].tasks[emptyRowIndex] = { ...task, id: task._id };
          }
        });

        setTasks(organizedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [startDate, endDate, session]);
  const handleTextareaChange = (dayIndex, rowIndex) => (e) => {
    const updatedTask = { ...tasks[dayIndex].tasks[rowIndex], task: e.target.value };
    const updatedTasks = tasks.map((dayTasks, index) =>
      index === dayIndex
        ? {
            ...dayTasks,
            tasks: dayTasks.tasks.map((task, taskIndex) =>
              taskIndex === rowIndex ? updatedTask : task
            )
          }
        : dayTasks
    );
    setTasks(updatedTasks);
  };
  const handleOpenDialog = (dayIndex, rowIndex) => {
    setActiveDayIndex(dayIndex);
    setActiveTaskIndex(rowIndex);
    setSelectedDate(dates[dayIndex].isoDate);
    setIsDialogOpen(true);
  };

  const handleSaveTask = async (newTask) => {
    try {
      newTask.date = selectedDate;
      newTask.userId = session ? session.id:null;
      if (activeDayIndex !== null && activeTaskIndex !== null) {
        let taskId = tasks[activeDayIndex]?.tasks[activeTaskIndex]?.id;

        if (!taskId) {
          // New task
          taskId = ObjectId().toHexString();
          newTask.id = taskId;
          let savedTask;
          if (session) {savedTask = await taskService.createTaskByUserId(newTask);}
          else savedTask = await taskService.createTask(newTask);
          console.log("Saved task:", savedTask);

          const updatedTasks = tasks.map((dayTasks, dayIndex) =>
            dayIndex === activeDayIndex
              ? {
                  ...dayTasks,
                  tasks: dayTasks.tasks.map((task, taskIndex) =>
                    taskIndex === activeTaskIndex ? { ...savedTask, id: taskId } : task
                  )
                }
              : dayTasks
          );

          setTasks(updatedTasks);
        } else {
          // Existing task
          await taskService.updateTask(taskId, newTask);
          console.log("Updated task:", newTask);

          const updatedTasks = tasks.map((dayTasks, dayIndex) =>
            dayIndex === activeDayIndex
              ? {
                  ...dayTasks,
                  tasks: dayTasks.tasks.map((task, taskIndex) =>
                    taskIndex === activeTaskIndex ? { ...newTask, id: taskId } : task
                  )
                }
              : dayTasks
          );

          setTasks(updatedTasks);
        }

        setIsDialogOpen(false);
      } else {
        console.error("Cannot save task: active index is null");
        alert("Failed to save the task. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save the task:", error.response?.data || error.message);
      alert("Failed to save the task. Please try again.");
    }
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
        {Array(5).fill(0).map((_, rowIndex) => (
          <tr key={rowIndex} className="task-row">
            {tasks.map((dayTasks, dayIndex) => (
              <td key={dayIndex} className="task-cell">
                <Textarea
                  value={dayTasks.tasks[rowIndex]?.task || ''}
                  onChange={handleTextareaChange(dayIndex, rowIndex)}
                  onClick={() => handleOpenDialog(dayIndex, rowIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      {isDialogOpen && (
        <TaskDialog
          task={tasks[activeDayIndex]?.tasks[activeTaskIndex] || {}}
          onSave={handleSaveTask}
          onClose={() => setIsDialogOpen(false)}
          selectedDate={selectedDate}
        />
      )}
    </table>
  );
};

export default Calendar;
