import React, { useState, useEffect } from 'react';
import '../styles/TaskDialog.css';

const TaskDialog = ({ task, onSave, onClose, selectedDate }) => {
  const [newTask, setNewTask] = useState(task.task || '');
  const [isDone, setIsDone] = useState(task.isDone || false);
  const [extraNote, setExtraNote] = useState(task.extraNotes || '');
  const [date, setDate] = useState(selectedDate || new Date().toISOString().substr(0, 10));

  useEffect(() => {
    setNewTask(task.task || '');
    setIsDone(task.isDone || false);
    setExtraNote(task.extraNotes || '');
    setDate(selectedDate || new Date().toISOString().substr(0, 10));
  }, [task, selectedDate]);

  const handleSave = () => {
    if (!newTask.trim()) {
      alert("Task description cannot be empty");
      return;
    }
    onSave({
      ...task,
      task: newTask,
      isDone,
      extraNotes: extraNote,
      date: date
    });
    onClose();
  };

  const handleDone = () => {
    setIsDone(prevIsDone => !prevIsDone);
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'dialog-overlay') {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleClickOutside}>
      <div className="dialog-box">
        <header className="dialog-header">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-picker"
          />
        </header>

        <div className="textarea-container">
          <textarea 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter your task"
            className={`task-textarea ${isDone ? 'done' : ''}`}
          />
        </div>
        
        <textarea
          value={extraNote}
          onChange={(e) => setExtraNote(e.target.value)}
          placeholder="Extra notes"
          className="extra-note-textarea"
        />
        
        <footer className="dialog-actions">
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleDone} className={`done-button ${isDone ? 'active' : ''}`}>
            {isDone ? 'Undo' : 'Done'}
          </button>
          <button onClick={onClose} className="close-button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default TaskDialog;
