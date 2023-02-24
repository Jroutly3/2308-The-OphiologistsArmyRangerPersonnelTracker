import React from "react";
import { Dropdown, Option } from "../components/DropdownDOD";
  
const UpdateExistingPersonnel = () => {
  
  return (
    <div>
      <h1>
        Update Existing Personnel
      </h1>
      <p>Please select the user's DODID</p>
      <Dropdown
        formLabel="Choose a service"
        buttonText="Send form"
        action="/"
      >
        <Option selected value="Click to see options" />
        <Option value="Option 1" />
        <Option value="Option 2" />
        <Option value="Option 3" />
      </Dropdown>
    </div>
  );
};
  
export default UpdateExistingPersonnel;