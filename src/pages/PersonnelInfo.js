import React from "react";
import './PersonnelInfo.css';

const PersonnelInfo = (person) => {
    console.log(person);
    return (
      <div className="Personnel">
        <h1>
          Personnel Info:
        </h1>
        <h2 className="info">Rank and Name</h2>
        <p className="info">DODID: {person.DODID}</p>
        <p className="info">Unit: </p>
        <p className="info">Birthdate: </p>
        <p className="info">SSN: </p>
        <p className="info">Address: </p>
        <p className="info">Status: </p>
      </div>
    );
  };
    
  export default PersonnelInfo;