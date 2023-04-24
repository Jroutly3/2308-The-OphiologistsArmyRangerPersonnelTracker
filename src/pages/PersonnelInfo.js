// Displays the personnel info when a card in search or sort is clicked
import React, {useState} from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { currentuser } from "../App";

const PersonnelInfo = (props) => {
  const [file, setFile] = useState()

  //This is used for file upload
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  //Collects the info of the selected member of personnel
  const location = useLocation()
  const { from } = location.state

  // Allows for file upload. This is not yet connected to the database
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }

  //Checks if the user is allowed to view the information of the member of personnel they clicked based on if they are in the same company
  var allow;
  const user = currentuser();
  var i = 0;
  while(i < user.unit.length) {
    if (from.unit !== user.unit[i]) {
      allow = false
    } else {
      allow = true
      i = user.unit.length
    }
    i++;
  }
  
  // u represents univeral access, which we have given to admins. Feel free to delete this if you don't want a universal access condition
  if (user.unit === 'u') {
    allow = true
  }

  // If the user is allowed to view the personnel information, then this will run and all the info will be shown
  const allowed = (
    <div className="Personnel">
        <h1>
          Personnel Info:
        </h1>
        <h2 className="info">{from.Rank} {from.name}</h2>
        <p className="info">DODID: {from.DODID}</p>
        <p className="info">Company: {from.unit}</p>
        <p className="info">Birthdate: {from.Birthdate}</p>
        <p className="info">SSN: {from.ssn}</p>
        <p className="info">Address: {from.Address}</p>
        <p className="info">Status: {from.Status}</p>
        <form onSubmit={handleSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        <div style={{padding: 250}}></div>
      </div>
  )

  // If the user is not allowed to view the information, they will be told access is denied 
  const disallow = (
    <div className="Personnel">
      <h1>Access Denied</h1>
      <div style={{padding: 400}}></div>
    </div>
  )
  // Runs the check for allow vs disallow
    return (
      <div>
      {allow ? allowed : disallow}
    </div>
    );
  };
    
  export default PersonnelInfo;
