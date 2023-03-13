import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';

const EnterNewPersonnel = props => {
  const [state, setState] = useState({
    username: "",
    email: "",
    city: "",
    phone: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  var letterStyle = {
    padding: 10
  }

  return (
    <div>
      <h1>Enter New Perssonel</h1>
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
            name="ssn"
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
          <Form.Control
            type="text"
            placeholder="Enter Status"
            name="Status"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Link
          className="button-prime"
          to={{
            pathname: "/UpdatePersonnelConfirm",
            state
          }}
        >
          Register
        </Link>
      </Form>
    </div>
  );
};

export default EnterNewPersonnel;