import { format } from 'date-fns';
import React from 'react';
import Buttons from './Buttons';
function Header(){
    const currentDate = new Date();
    const currentMonthName = format(currentDate, 'MMMM');
    const currentYear=currentDate.getFullYear();
  
    return (
        <>
        
        <div className='date'>
        <p>{currentMonthName} {currentYear}</p>
        <Buttons/>
        
      </div>
       
      </>
    );
}
export default Header;