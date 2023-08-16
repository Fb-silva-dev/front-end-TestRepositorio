import React from "react";
import{Link} from 'react-router-dom'
//import './headerMain.css'
import Back from '../../images/Back Button.png';

function Header(){
return(

    <header>
        <div className = "container">  
            <Link to="/ ">    
            <img src={Back} style={{width: '50px'}} />            
            </Link>    
        </div>
    </header>

)
}

export default Header
