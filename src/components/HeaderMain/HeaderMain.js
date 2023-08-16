import React from "react";
import{Link} from 'react-router-dom'
import './headerMain.css'

function HeaderMain(){
return(

    <header>
        <div className = "container">
            <div className="Logo">
                <h1>FalaAqui!</h1>
            </div>

            <div className="btn-newPost">
            <Link to="/post">
                <button>+ Nova Postagem</button>
            </Link>
            </div>

        </div>
    </header>

)
}

export default HeaderMain