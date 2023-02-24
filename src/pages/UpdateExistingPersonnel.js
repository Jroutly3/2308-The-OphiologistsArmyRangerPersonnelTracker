import React from "react";
import { Dropdown, Option } from "../components/DropdownDOD";
import initialDetails from '../data/initialDetails';
  
const UpdateExistingPersonnel = () => {
  
  return (
    <div>
      <h1>
        Update Existing Personnel
      </h1>
      <Dropdown
        formLabel="Select the user's DODIDe"
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
    </div>
  );
};
  
export default UpdateExistingPersonnel;