import React, { useState } from 'react';
import DateOfHeader from '../components/DateOfHeader';
import Buttons from '../components/Buttons';
import pic from '../assets/utilisateur.png';
import LoginDialog from '../components/LoginDialog';
import About from '../components/About'; 

function Header({ week, setWeek, fetchTasks }) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false); // Initialize to false

  const handleOpenLoginDialog = () => setIsLoginDialogOpen(true);
  const handleCloseLoginDialog = () => setIsLoginDialogOpen(false);
  const handleOpenAboutDialog = () => setIsAboutDialogOpen(true);
  const handleCloseAboutDialog = () => setIsAboutDialogOpen(false);

  const handleWeekChange = (direction) => {
    const newWeek = direction === 'next' ? week + 1 : week - 1;
    console.log("Changing week to:", newWeek);
    setWeek(newWeek); // Update the week state
    fetchTasks(newWeek); // Re-fetch tasks for the new week
  };

  return (
    <>
      <nav className="nav">
        <div className="left">
          <DateOfHeader week={week} />
        </div>
        <div className="right">
          <Buttons icon={<img src={pic} alt="" className="icon" />} onClick={handleOpenLoginDialog} />
          <Buttons icon="&#8942;" onClick={handleOpenAboutDialog} /> {/* Open AboutDialog on click */}
          <Buttons
            className="buttPrevious"
            icon="&lt;"
            onClick={() => handleWeekChange('previous')}
          />
          <Buttons
            className="ButtNext"
            icon="&gt;"
            onClick={() => handleWeekChange('next')}
          />
        </div>
      </nav>

      {isLoginDialogOpen && <LoginDialog onClose={handleCloseLoginDialog} />}
      {isAboutDialogOpen && <About onClose={handleCloseAboutDialog} />}
    </>
  );
}

export default Header;
