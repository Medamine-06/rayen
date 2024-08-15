function Buttons(props) { 
  const updateWeekAndYear = () => {
    if (props.setweek) {
      props.setweek(props.className === 'buttPrevious' ? prevCounter => prevCounter - 1 : prevCounter => prevCounter + 1);
    }
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button onClick={updateWeekAndYear}>
      {props.icon}
    </button>  
  )
}

export default Buttons;
