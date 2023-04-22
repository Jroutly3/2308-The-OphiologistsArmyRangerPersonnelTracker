import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import Python from "../Python";
  

//var perf = require('./Python.html');

/*class LogOut extends React.Component {
  render(){
     return (
      <div>
      <iframe src="Python.html"></iframe>
    </div>
     );
  }
}*/
function LogOut() {
  function refreshPage(){
    window.location.reload();
} 
  return(
    <div>
    <Link to="/Welcome" onClick={refreshPage}>Log Out</Link>
    <div style={{padding:325}}></div>
    </div>
  );
}

export default LogOut;