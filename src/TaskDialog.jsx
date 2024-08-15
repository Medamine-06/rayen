import React, { useState } from 'react';
import './TaskDialog.css';

const TaskDialog = ({ task, onSave, onClose }) => {
  const [newTask, setNewTask] = useState(task);
  const [isDone, setIsDone] = useState(false);
  const [extraNote, setExtraNote] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));

  const handleSave = () => {
    onSave(newTask);
  };

  const handleDone = () => {
    setIsDone(!isDone);
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </header>

              <div className="textarea-container">
              <textarea 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter your task"
                className="task-textarea"
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
          <button onClick={onClose} className="close-button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default TaskDialog;