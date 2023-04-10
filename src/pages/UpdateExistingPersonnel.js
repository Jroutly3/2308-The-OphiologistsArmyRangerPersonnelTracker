import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';
import { Dropdown, Option } from "../components/DropdownDOD";
import initialDetails from '../data/initialDetails';
import { DropdownSelect, OptionSelect } from '../components/DropdownSelector'
  
const UpdateExistingPersonnel = () => {
  var letterStyle = {
    padding: 10,
    margin: 10,
    textAlign: "center",
    justifyContent:'center',
};
  return (
    <div style={letterStyle}>
      <h1 style={letterStyle}>
        Update Existing Personnel
      </h1>
      <Dropdown
        formLabel="Select the user's DODID"
        buttonText="Submit"
        action= "/UpdatePersonnelConfirm"
        style={letterStyle} 
      >
        <Option selected value="Click to see options" style={letterStyle}/>
        <Option value= {initialDetails.initialDetails[0].DODID} />
        <Option value= {initialDetails.initialDetails[1].DODID} />
        <Option value= {initialDetails.initialDetails[2].DODID} />
        <Option value= {initialDetails.initialDetails[3].DODID} />
        <Option value= {initialDetails.initialDetails[4].DODID} />
        <Option value= {initialDetails.initialDetails[5].DODID} />
        <Option value= {initialDetails.initialDetails[6].DODID} />
        <Option value= {initialDetails.initialDetails[7].DODID} />
        <Option value= {initialDetails.initialDetails[8].DODID} />
        <Option value= {initialDetails.initialDetails[9].DODID} />
        <Option value= {initialDetails.initialDetails[10].DODID} />
        <Option value= {initialDetails.initialDetails[11].DODID} />
      </Dropdown>
      <DropdownSelect
        formLabel="What do you want to change?"
        buttonText="Submit"
        action= "/UpdatePersonnelConfirm"
        style={letterStyle} 
      >
        <OptionSelect selected value="Click to see options" style={letterStyle}/>
        <OptionSelect value= "Rank" />
        <OptionSelect value= "Unit" />
        <OptionSelect value= "Name" />
        <OptionSelect value= "Ssn" />
        <OptionSelect value= "Birthdate" />
        <OptionSelect value= "Address" />
        <OptionSelect value= "Status" />
      </DropdownSelect>
      <div style={{padding: 140}}></div>
    </div>
  );
  /**/

};
  
export default UpdateExistingPersonnel;