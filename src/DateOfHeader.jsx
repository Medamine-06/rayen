
import { format } from 'date-fns';

function DateOfHeader(props) {
  const today = new Date();
  today.setDate(today.getDate()+ props.week * 7);
  const year=today.getFullYear();
  const currentMonthName = format(today, 'MMMM');
 
  return (
    <h2>{currentMonthName} {year}</h2>
  )
}

export default DateOfHeader;
