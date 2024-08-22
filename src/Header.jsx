import React, { useState } from 'react';
import DateOfHeader from './DateOfHeader';
import Buttons from './Buttons';
import pic from './assets/utilisateur.png';
import LoginDialog from './LoginDialog';
import About from './About'; // Import About component

function Header(props) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(true); // Initialize to false

  const handleOpenLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  const handleOpenAboutDialog = () => {
    setIsAboutDialogOpen(true);
  };

  const handleCloseAboutDialog = () => {
    setIsAboutDialogOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="left">
          <DateOfHeader week={props.week} />
        </div>
        <div className="right">
          <Buttons icon={<img src={pic} alt="" className="icon" />} onClick={handleOpenLoginDialog} />
          <Buttons icon="&#8942;" onClick={handleOpenAboutDialog} /> {/* Open AboutDialog on click */}
          <Buttons className="buttPrevious" icon="&lt;" setweek={props.setweek} />
          <Buttons className="ButtNext" icon="&gt;" setweek={props.setweek} />
        </div>
      </nav>

      {isLoginDialogOpen && <LoginDialog onClose={handleCloseLoginDialog} />}
      {isAboutDialogOpen && <About onClose={handleCloseAboutDialog} />} {/* Render AboutDialog only when true */}
    </>
  );
}

export default Header;
