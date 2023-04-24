import React from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'
//import axios from 'axios';
import { NavLink } from "react-router-dom";
import initialDetails from "../data/initialDetails.json"

const UpdatePersonnelConfirm = props => {
  
  //console.log(props);
  //console.log(props.location);
  const location = useLocation()
  const { from } = location.state
  //console.log(location);
  
  console.log(from);
  const length = initialDetails.initialDetails.length;
  var addedPersonnel = {
    Rank: from.Rank,
    unit: from.Company,
    name: from.Name,
    ssn: from.SSN,
    DODID: from.DODID,
    Birthdate: from.Birthdate,
    Address: from.Address,
    Status: from.Status
  }
  var test = 0;
  var i = 0;
  for (i; i < length; i++) {
    if (initialDetails.initialDetails[i].DODID === addedPersonnel.DODID) {
      test = 1;
      console.log("Caught")
    }
  }
  if (test === 0) {
    initialDetails.initialDetails[length] = addedPersonnel;
  }
  console.log(initialDetails);
  return (
    <div>
      <NavLink to="/EnterNewPersonnel" activeClassName="active">
        Go Back
      </NavLink>
      <div className="form-details">
        <div>
          <strong>Rank:</strong> {from.Rank}
        </div>
        <div>
          <strong>Company:</strong> {from.Company}
        </div>
        <div>
          <strong>Name:</strong> {from.Name}
        </div>
        <div>
          <strong>SSN:</strong> {from.SSN}
        </div>
        <div>
          <strong>DODID:</strong> {from.DODID}
        </div>
        <div>
          <strong>Birthdate:</strong> {from.Birthdate}
        </div>
        <div>
          <strong>Address:</strong> {from.Address}
        </div>
        <div>
          <strong>Status:</strong> {from.Status}
        </div>
        <div style={{padding: 320}}></div>
      </div>
    </div>
  );
};

export default UpdatePersonnelConfirm;

/**/