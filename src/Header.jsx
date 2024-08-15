import React, { useState } from 'react';
import DateOfHeader from './DateOfHeader';
import Buttons from './Buttons';
import pic from './assets/utilisateur.png';
import LoginDialog from './LoginDialog';

function Header(props) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="left">
          <DateOfHeader week={props.week} />
        </div>
        <div className="right">
          <Buttons icon={<img src={pic} alt="" className="icon" />} onClick={handleOpenDialog} />
          <Buttons icon="&#8942;" />
          <Buttons className="buttPrevious" icon="&lt;" setweek={props.setweek} />
          <Buttons className="ButtNext" icon="&gt;" setweek={props.setweek} />
        </div>
      </nav>

      {isLoginDialogOpen && <LoginDialog onClose={handleCloseDialog} />}
    </>
  );
}

export default Header;
