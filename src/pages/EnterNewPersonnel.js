import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';
// import initialDetails from '../data/initialDetails.json'

const EnterNewPersonnel = props => {
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  var letterStyle = {
    padding: 10,
    justifyContent:'center',
    alignItems:'left',
    display: 'flex',
  }

  return (
    <div>
      <h1 className="letterStyle">Enter New Perssonel</h1>
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
          <Form.Control
            type="text"
            placeholder="Enter Status"
            name="Status"
            onChange={handleInputChange}
          />
        </Form.Group>
        <div style={letterStyle}>
        <Link
          className="btn-prime"
          to= "/UpdatePersonnelConfirm"
          state={{ from: state }}
  
        >
          Register
        </Link>
        </div>
      </Form>
      <div style={{padding: 100}}></div>
    </div>
  );
};

export default EnterNewPersonnel;

/*<Link
          className="button-prime"
          to={{
            pathname: "/UpdatePersonnelConfirm",
            state
          }}
          onClick = {console.log(state)}
        >
          Register
        </Link>*/