import axiaLogo from '../assets/axia.png'
function Footer(){
    return(
        <footer className='footer'>
             <a href="https://www.axiasolution.com/" target="_blank" rel="noopener noreferrer">
            <img src={axiaLogo} alt="" className='axiaLogo'/>
            </a>
            </footer>
    )
}
export default Footer