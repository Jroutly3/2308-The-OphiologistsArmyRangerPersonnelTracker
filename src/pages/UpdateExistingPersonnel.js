//Lets the user update an existing member of personnel. The actual updating is done in updatepersonnelconfirm, this is the page that lets us get the data
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';

const UpdateExistingPersonnel = () => {
  // Declares everything that can change
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

  // Changes the input value based on what the user inputs
  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //Styling
  var letterStyle = {
    padding: 10,
    justifyContent:'center',
    alignItems:'left',
    display: 'flex'
  }

  // Displays the update existing personnel frontend. This will send the information on what the user wants to change to update personnel confirm.
  return (
  <div>
      <h1 className="letterStyle">Update Existing Personnel</h1>
      <Form className="register-form">
        <Form.Group controlId="DODID" style={letterStyle}>
          <Form.Label>Personnel DODID:  </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter DODID"
            name="DODID"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Status" style={letterStyle}>
          <Form.Label>Name of changed field: </Form.Label>
          <Form.Select
            name="Status"
            onChange={handleInputChange}>
              <option value="Unselected">Field</option>
              <option value="Rank">Rank</option>
              <option value="unit">Company</option>
              <option value="name">name</option>
              <option value="ssn">ssn</option>
              <option value="Birthdate">Birthdate</option>
              <option value="Address">Address</option>
              <option value="Status">Status</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="Name" style={letterStyle}>
          <Form.Label>New Value: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New Value"
            name="Name"
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <div style={letterStyle}>
        <Link
          className="btn-prime"
          to= "/UpdatePersonnelConfirm"
          state={{ from: state }}
  
        >
          Update
        </Link>
        </div>
      </Form>
      <div style={{padding: 300}}></div>
    </div>
  );
}
  
export default UpdateExistingPersonnel;