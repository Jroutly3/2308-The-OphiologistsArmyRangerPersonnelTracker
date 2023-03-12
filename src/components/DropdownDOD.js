import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
} from "./dropDownDODstyle";
// import initialDetails from '../data/initialDetails';

export function Dropdown(props) {
  
  return (
    <DropdownWrapper action={props.action} style>
      <StyledLabel htmlFor="services">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="services" name="services">
        {props.children}
      </StyledSelect>
    </DropdownWrapper>
  );
}
// [Name, Rank, Unit, Ssn, Birthdate, Address, Status]
export function Option(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}