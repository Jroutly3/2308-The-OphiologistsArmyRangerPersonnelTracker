import React from "react";
import './Card.css'

function Card({person}) {
    return(
        <div className="tc bg-light-green dib br3 pa1 ma2 grow bw2 shadow-5 fl w-100">
            <div className="card">
                <p>{person.Rank}</p>
                <p>{person.name}</p>
                <p>{person.unit}</p>
                <p>{person.DODID}</p>
                <p>{person.Birthdate}</p>
                <p>{person.ssn}</p>
                <p>{person.Address}</p>
                <p>{person.Status}</p>
            </div>
        </div>
    )
}

export default Card;