import React from 'react'
import { format } from 'date-fns';

function DateOfToday () {
    const currentDate = new Date();
    const currentMonthName = format(currentDate, 'MMMM');
    const currentYear=currentDate.getFullYear();
  return (
      <h2>{currentMonthName} {currentYear}</h2>
  )
};
export default DateOfToday;
