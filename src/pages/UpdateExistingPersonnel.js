import React from "react";
import { Dropdown, Option } from "../components/DropdownDOD";
import initialDetails from '../data/initialDetails';
import { DropdownSelect, OptionSelect } from '../components/DropdownSelector'
  
const UpdateExistingPersonnel = () => {
  var letterStyle = {
    padding: 10,
    margin: 10,
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: 24,
    textAlign: "center"
};
  return (
    <div style={letterStyle}>
      <h1>
        Update Existing Personnel
      </h1>
      <Dropdown
        formLabel="Select the user's DODID"
        buttonText="Submit"
        action= "/UpdatePersonnelConfirm" 
      >
        <Option selected value="Click to see options" />
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
      >
        <OptionSelect selected value="Click to see options" />
        <OptionSelect value= "Rank" />
        <OptionSelect value= "Unit" />
        <OptionSelect value= "Name" />
        <OptionSelect value= "Ssn" />
        <OptionSelect value= "Birthdate" />
        <OptionSelect value= "Address" />
        <OptionSelect value= "Living" />
      </DropdownSelect>
    </div>
  );
};
  
export default UpdateExistingPersonnel;