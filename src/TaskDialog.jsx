import React, { useState } from 'react';
import './TaskDialog.css';

const TaskDialog = ({ task, onSave, onClose }) => {
  const [newTask, setNewTask] = useState(task);

  const handleSave = () => {
    onSave(newTask);
  };

  return (
  
    <div className="dialog-overlay">
      <div className="dialog-box">
        <textarea
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter your task"
        />
       <footer className="dialog-actions">
          <button onClick={handleSave} className='SaveButton'>Save</button>
          <button onClick={onClose}className='CloseButton'>Cancel</button>
        </footer>
      </div>
      
    </div>
    
   
  );
};

export default TaskDialog;
