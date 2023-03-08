import React, {useState} from "react";
import PersonnelInfo from "../pages/PersonnelInfo";
import './Card.css'

function Card({person}) {
    const [sortField, setsortField] = useState(false);
    function passPersonnel() {
        console.log(person.DODID)
        if (sortField === false) {
            setsortField(true);
          } else {
            setsortField(false);
          }
    }
    
    return(
        <div className="tc bg-light-green dib br3 pa1 ma2 grow bw2 shadow-5 fl w-100" >
            <div className="card" onClick={passPersonnel}  person={person}>
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
//event =>  window.location.href='/PersonnelInfo'

export default Card;