import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './EnterNewPersonnel.css';

const UpdateExistingPersonnel = () => {
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
    display: 'flex'
  }
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

/*
  return (
    <div style={letterStyle}>
      <h1 style={letterStyle}>
        Update Existing Personnel
      </h1>
      <Dropdown
        formLabel="Select the user's DODID"
        buttonText="Submit"
        action= "/UpdatePersonnelConfirm"
        style={letterStyle} 
      >
        <Option selected value="Click to see options" style={letterStyle}/>
        <Option value= {initialDetails.initialDetails[0].DODID} />
        <Option value= {initialDetails.initialDetails[1].DODID} />
        <Option value= {initialDetails.initialDetails[2].DODID} />
        <Option value= {initialDetails.initialDetails[3].DODID} />
        <Option value= {initialDetails.initialDetails[4].DODID} />
        <Option value= {initialDetails.initialDetails[5].DODID} />
        <Option value= {initialDetails.initialDetails[6].DODID} />
        <Option value= {initialDetails.initialDetails[7].DODID} />
        <Option value= {initialDetails.initialDetails[8].DODID} />
        <Option value= {initialDetails.initialDetails[9].DODID} />
        <Option value= {initialDetails.initialDetails[10].DODID} />
        <Option value= {initialDetails.initialDetails[11].DODID} />
      </Dropdown>
      <DropdownSelect
        formLabel="What do you want to change?"
        buttonText="Submit"
        action= "/UpdatePersonnelConfirm"
        style={letterStyle} 
      >
        <OptionSelect selected value="Click to see options" style={letterStyle}/>
        <OptionSelect value= "Rank" />
        <OptionSelect value= "Unit" />
        <OptionSelect value= "Name" />
        <OptionSelect value= "Ssn" />
        <OptionSelect value= "Birthdate" />
        <OptionSelect value= "Address" />
        <OptionSelect value= "Status" />
      </DropdownSelect>
      <div style={{padding: 140}}></div>
    </div>
  );*/
  
export default UpdateExistingPersonnel;