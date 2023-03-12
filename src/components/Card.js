import React from "react";
import './Card.css'
import { Link } from "react-router-dom";


function Card({person}) {
    
    return(
        <div className="tc bg-light-green dib br3 pa1 ma2 grow bw2 shadow-5 fl w-100" >
        <Link to="/PersonnelInfo" state={{ from: person }} className="card">
            <p>{person.Rank}</p>
            <p>{person.name}</p>
            <p>{person.unit}</p>
            <p>{person.DODID}</p>
        </Link>
    </div>
    )
}
    

export default Card;