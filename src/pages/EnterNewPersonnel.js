/*Creates the enter new personnel page. This file does not add the new member of personnel to the array yet, it's only for the initial entering data*/
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';

const EnterNewPersonnel = props => {
  // Creates a variable to show what the user is entering
  const [state, setState] = useState({
    Rank: "",
    Company: "",
    Name: "",
    SSN: "",
    DODID: "",
    Birthdate: "",
    Address: "",
    Status: ""
  });

  //Changes the above variable based on what the user types in the page
  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  //Standard website styling
  var letterStyle = {
    padding: 10,
    justifyContent:'center',
    alignItems:'left',
    display: 'flex',
  }

  // Builds the page. Creates a form with different values based on what is expected to be entered for a member of personnel.
  // Clicking on Register will take the user to NewPersonnelConfirm
  return (
    <div>
      <h1 className="letterStyle">Enter New Personnel</h1>
      <Form className="register-form">
        <Form.Group controlId="Rank" style={letterStyle}>
          <Form.Label>Rank:  </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Rank"
            name="Rank"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Company" style={letterStyle}>
          <Form.Label>Company: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company"
            name="Company"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Name" style={letterStyle}>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="Name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="ssn" style={letterStyle}>
          <Form.Label>SSN: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ssn"
            name="SSN"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="DODID" style={letterStyle}>
          <Form.Label>DODID: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter DODID"
            name="DODID"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Birthdate" style={letterStyle}>
          <Form.Label>Birthdate: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Birthdate"
            name="Birthdate"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Address" style={letterStyle}>
          <Form.Label>Address: </Form.Label>
          <Form.Control
            type="Address"
            placeholder="Enter Address"
            name="Address"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Status" style={letterStyle}>
          <Form.Label>Status: </Form.Label>
          <Form.Select
            name="Status"
            onChange={handleInputChange}>
              <option value="Unselected">Select Status</option>
              <option value="PDY">PDY</option>
              <option value="School">School</option>
              <option value="Leave">Leave</option>
            </Form.Select>
        </Form.Group>
        <div style={letterStyle}>
        <Link
          className="btn-prime"
          to= "/NewPersonnelConfirm"
          state={{ from: state }}
  
        >
          Register
        </Link>
        </div>
      </Form>
      <div style={{padding: 190}}></div>
    </div>
  );
};

export default EnterNewPersonnel;