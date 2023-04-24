/*Confirms the new member of personnel is created and actually adds them to the array. Again, this is not yet connected to the backend, but it is set up to be connected easily 
once the proper security measures are in place*/
import React from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import initialDetails from "../data/initialDetails.json"

const UpdatePersonnelConfirm = props => {
  
  //basic variables to pull the new member of personnel from the enter new personnel page
  const location = useLocation()
  const { from } = location.state
  
  const length = initialDetails.initialDetails.length;
  // creates a variable for later use based on what the user entered
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
  // Will be used to ensure the same member of personnel isn't being double-counted
  var test = 0;
  var i = 0;
  for (i; i < length; i++) {
    if (initialDetails.initialDetails[i].DODID === addedPersonnel.DODID) {
      test = 1;
      console.log("Caught")
    }
  }
  // If the test passes, we add the new member of personnel to the json file
  if (test === 0) {
    initialDetails.initialDetails[length] = addedPersonnel;
  }

  // Creates the confirmation page showing what the user entered and a back button
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