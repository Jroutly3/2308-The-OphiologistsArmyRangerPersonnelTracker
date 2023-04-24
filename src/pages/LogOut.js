// Allows the user to logout. Pressing the button reloads the page to sim a logout. This should be changed based on military security.
import React from "react";
import { Link } from "react-router-dom";

function LogOut() {
  function refreshPage(){
    window.location.reload();
} 
  return(
    <div>
    <Link to="/Welcome" onClick={refreshPage}>Log Out</Link>
    <div style={{padding:450}}></div>
    </div>
  );
}

export default LogOut;