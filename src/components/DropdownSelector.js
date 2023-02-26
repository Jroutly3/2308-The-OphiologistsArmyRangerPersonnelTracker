import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from "./dropDownDODstyle";
import initialDetails from '../data/initialDetails';

export function DropdownSelect(props) {
  return (
    <DropdownWrapper action={props.action}>
      <StyledLabel htmlFor="services">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="services" name="services">
        {props.children}
      </StyledSelect>
      <StyledButton type="submit" value={props.buttonText}/>
    </DropdownWrapper>
  );
}
// [Name, Rank, Unit, Ssn, Birthdate, Address, Status]
export function OptionSelect(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}