/*Creates the user card used in the search and sort function. This file also lets the user click on a member of personnel and see their info*/
import React from "react";
import './Card.css'
import { Link } from "react-router-dom";


function Card({person}) {
    
    return(
        <div className="tc bg-light-green dib br3 pa1 pl3 ma2 ml5 grow bw2 shadow-5 fl w-90" >
        <Link to="/PersonnelInfo" state={{ from: person }} className="card">
            <p style={{maxWidth:"25%", minWidth:"25%", textAlign:"left"}}>{person.Rank}</p>
            <p style={{maxWidth:"25%", minWidth:"25%", textAlign:"left"}}>{person.name}</p>
            <p style={{maxWidth:"25%", minWidth:"25%", textAlign:"left"}}>{person.unit}</p>
            <p style={{maxWidth:"25%", minWidth:"25%", textAlign:"left"}}>{person.DODID}</p>
        </Link>
    </div>
    )
}
    

export default Card;