import pic from './assets/utilisateur.png'
function Buttons(){
    
    return(
    <div className='buttons-container'>
    <button className='button'><img src={pic} alt="" /></button>
    <button className='button'>&#8942;</button>
    <button className='button'>&lt;</button>
    <button className='button'>&gt;</button>
    </div>
    )
}
export default Buttons