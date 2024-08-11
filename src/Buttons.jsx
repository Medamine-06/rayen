// Buttons.jsx

function Buttons(props){ 
    
    const updateWeekAndYear = () => {
      props.setweek(props.className === 'buttPrevious' ? prevCounter => prevCounter - 1 : prevCounter => prevCounter + 1);
     // props.setyear(props.className === 'buttPrevious' ? prevCounter => prevCounter - 1 : prevCounter => prevCounter + 1);  
    }
  
    return (
      <button onClick={updateWeekAndYear}>

        {props.icon}
      </button>  
    )
  }
  
  export default Buttons;
  