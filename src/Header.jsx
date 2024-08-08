import React from 'react';
import DateOfToday from'./DateOfToday';
import Buttons from './Buttons';
import pic from './assets/utilisateur.png';


function Header(props){
    
    return (
        <>
       <nav className="nav">
                <div className="left">
                    <DateOfToday />
                </div>
                <div className="right">
                    <Buttons icon={<img src={pic} alt="" className="icon" />} />
                    <Buttons icon="&#8942;" />
                    <Buttons className="buttPrevious" icon="&lt;"  setweek={props.setweek} SetYear={props.Year}/>
                    <Buttons className="ButtNext" icon="&gt;" setweek={props.setweek} SetYear={props.Year} />
                </div>
            </nav>
       
      </>
    );
}

export default Header;