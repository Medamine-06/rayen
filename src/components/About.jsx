import React from 'react';
import '../styles/About.css';
import pic from '../assets/aboutaxia.jpg';
import {useState} from 'react';
import LoginDialog from '../components/LoginDialog';

function About ({ onClose }) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const handleOpenLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <div className="dialog-overlay" >
      <div className="about-container" onClick={(e) => e.stopPropagation()}>
        <div className="about-content">
          <h3>
          Axia Calendar is a Minimal Weekly Planner & To-Do List App.
          </h3>
          
          <div className="image-container">
            <img src={pic} alt="Axia Calendar" style={{ width: '80%', height: '20em', borderRadius: '10px' }} />
          </div>

          <div className="about-buttons">
            <button className="start-now" onClick={onClose}>Start now</button>
            <button className="log-in" onClick={handleOpenLoginDialog}>Log in</button>
          </div>
          <p>Learn more about how Axia Calendar can help you manage your tasks and schedule effectively.</p>
        </div>
      </div>
      {isLoginDialogOpen && <LoginDialog onClose={handleCloseLoginDialog} />}
      
      

    </div>
    
  );
}
export default About;
