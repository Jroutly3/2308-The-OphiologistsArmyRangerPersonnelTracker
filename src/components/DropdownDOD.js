import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
} from "./dropDownDODstyle";
// import initialDetails from '../data/initialDetails';

export function Dropdown(props) {
  var letterStyle = {
    textAlign: "center",
    justifyContent:'center'
};
  return (
    <div style={letterStyle}>
    <DropdownWrapper action={props.action} style={letterStyle}>
      <StyledLabel htmlFor="services" style={letterStyle}>
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="services" name="services" style={letterStyle}>
        {props.children}
      </StyledSelect>
    </DropdownWrapper>
    </div>
  );
}
// [Name, Rank, Unit, Ssn, Birthdate, Address, Status]
export function Option(props) {
  var letterStyle = {
    textAlign: "center",
    justifyContent:'center'
};
  return (
    <StyledOption selected={props.selected} style={letterStyle}>
      {props.value}
    </StyledOption>
  );
}