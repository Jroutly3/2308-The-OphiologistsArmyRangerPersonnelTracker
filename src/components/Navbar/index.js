import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";

// import initialDetails from "../../data/initialDetails";
  
const navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/Search" activeStyle>
            Search
          </NavLink>
          <NavLink to="/Sort" activeStyle>
            Sort
          </NavLink>
          <NavLink to="/EnterNewPersonnel" activeStyle>
            Enter New Personnel
          </NavLink>
          <NavLink to="/UpdateExistingPersonnel" activeStyle>
            Update Existing Personnel
          </NavLink>
          <NavLink to="/LogOut" activeStyle>
            Log Out
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default navbar;
