import React from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'
//import axios from 'axios';
import { NavLink } from "react-router-dom";
import initialDetails from "../data/initialDetails.json"
import { Alert } from "react-bootstrap";
import { currentuser } from "../App";

const UpdatePersonnelConfirm = props => {
  
  //console.log(props);
  //console.log(props.location);
  const location = useLocation()
  const { from } = location.state
  //console.log(location);
  
  console.log(from);
  const length = initialDetails.initialDetails.length;
  var addedPersonnel = {
    picked: from.Status,
    name: from.Name,
    DODID: from.DODID,
  }
  var test = 0;
  const user = currentuser();
  var allow = false;
  var i = 0
  for (i; i < length; i++) {
    if (initialDetails.initialDetails[i].DODID === addedPersonnel.DODID) {
      var j = 0
      while(j < user.unit.length) {
        if (initialDetails.initialDetails[i].unit !== user.unit[j]) {
          allow = false
        } else {
          allow = true
          j = user.unit.length
        }
        j++;
      }
      if (allow) {
      if (addedPersonnel.picked === "Rank") {
        initialDetails.initialDetails[i].Rank = addedPersonnel.name;
      } else if (addedPersonnel.picked === "Company") {
        initialDetails.initialDetails[i].unit = addedPersonnel.name;
      } else if (addedPersonnel.picked === "SSN") {
        initialDetails.initialDetails[i].SSN = addedPersonnel.name;
      } else if (addedPersonnel.picked === "DODID") {
        initialDetails.initialDetails[i].DODID = addedPersonnel.name;
      } else if (addedPersonnel.picked === "Birthdate") {
        initialDetails.initialDetails[i].birthdate = addedPersonnel.name;
      } else if (addedPersonnel.picked === "Address") {
        initialDetails.initialDetails[i].address = addedPersonnel.name;
      } else if (addedPersonnel.picked === "Status") {
        initialDetails.initialDetails[i].status = addedPersonnel.name;
      } else if (addedPersonnel.picked === "name") {
        initialDetails.initialDetails[i].name = addedPersonnel.name;
      }
      
    test = 1
  } else {
    alert("Failed")
  }
    }
  }
  if (test === 0 && allow) {
    alert("DODID not found")
  }
  console.log(initialDetails);
  if (test === 1 ) {
    return (
      <div>
        <NavLink to="/EnterNewPersonnel" activeClassName="active">
          Go Back
        </NavLink>
        <Alert>Personnel {addedPersonnel.DODID}'s {addedPersonnel.picked} has been updated</Alert>
        <div style={{padding: 500}}></div>
      </div>
    );
  } else {
  return (
    <div>
      <NavLink to="/EnterNewPersonnel" activeClassName="active">
        Go Back
      </NavLink>
      <div style={{padding: 500}}></div>
    </div>
  );
}
};

export default UpdatePersonnelConfirm;

/**/