import React from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'

const PersonnelInfo = (props) => {
  //console.log(props);
  //console.log(props.location);
  const location = useLocation()
  const { from } = location.state
  //console.log(location);
  console.log(from);
    return (
      <div className="Personnel">
        <h1>
          Personnel Info:
        </h1>
        <h2 className="info">{from.Rank} {from.name}</h2>
        <p className="info">DODID: {from.DODID}</p>
        <p className="info">Company: {from.unit}</p>
        <p className="info">Birthdate: {from.Birthdate}</p>
        <p className="info">SSN: {from.ssn}</p>
        <p className="info">Address: {from.Address}</p>
        <p className="info">Status: {from.Status}</p>
      </div>
    );
  };
    
  export default PersonnelInfo;

  /*
  <h2 className="info">{Personnel.Personnel.Rank} {Personnel.Personnel.name}</h2>
        <p className="info">DODID: {Personnel.Personnel.DODID}</p>
        <p className="info">Company: {Personnel.Personnel.unit}</p>
        <p className="info">Birthdate: {Personnel.Personnel.Birthdate}</p>
        <p className="info">SSN: {Personnel.Personnel.ssn}</p>
        <p className="info">Address: {Personnel.Personnel.Address}</p>
        <p className="info">Status: {Personnel.Personnel.Status}</p> */