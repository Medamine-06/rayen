function Buttons(props){ 
const UpdateWeek=()=>{
    props.setweek(props.className=='buttPrevious'?prevCounter=> prevCounter - 1 :prevCounter=> prevCounter + 1);
}

    return(
     <button onClick={()=>{ UpdateWeek() }}>{props.icon}
           
     </button>  

    )
}
export default Buttons