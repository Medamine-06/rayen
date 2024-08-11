import React, { useState } from 'react';
import DateOfHeader from'./DateOfHeader';
import Buttons from './Buttons';
import pic from './assets/utilisateur.png';



function Header(props){
    
    return (
        <>
       <nav className="nav">
                <div className="left">
                <DateOfHeader week={props.week}/>
                </div>
                <div className="right">
                    <Buttons icon={<img src={pic} alt="" className="icon" />} />
                    <Buttons icon="&#8942;" />
                    <Buttons className="buttPrevious" icon="&lt;"  setweek={props.setweek}/>
                    <Buttons className="ButtNext" icon="&gt;" setweek={props.setweek} />
                </div>
        </nav>
       
      </>
    );
}

export default Header;