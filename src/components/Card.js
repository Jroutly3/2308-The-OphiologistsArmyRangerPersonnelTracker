import React from "react";

function Card({person}) {
    return(
        <div className="tc bg-light-green dib br3 pa1 ma2 grow bw2 shadow-5 fl w-100">
            <div>
                <p>{person.name} {person.unit} {person.location} {person.DODID}</p>
            </div>
        </div>
    )
}

export default Card;