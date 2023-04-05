import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from "./dropDownDODstyle";
//import initialDetails from '../data/initialDetails';

export function DropdownSelect(props) {
  var letterStyle = {
    textAlign: "center",
    justifyContent:'center'
};
  return (
    <DropdownWrapper action={props.action} style={letterStyle}>
      <StyledLabel htmlFor="services" style={letterStyle}>
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="services" name="services" style={letterStyle}>
        {props.children}
      </StyledSelect>
      <input 
              className="StyledButton"
              type = "search" 
              placeholder = "New value"
            />
      <StyledButton type="submit" value={props.buttonText} style={{textAlign:"center", justifyContent:"center", padding: 10, margin:10, marginLeft:"25%"}}/>
    </DropdownWrapper>
  );
}
// [Name, Rank, Unit, Ssn, Birthdate, Address, Status]
export function OptionSelect(props) {
  return (
    <StyledOption selected={props.selected} style={{justifyContent:'center'}}>
      {props.value}
    </StyledOption>
  );
}