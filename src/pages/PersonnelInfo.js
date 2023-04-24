import React, {useState} from "react";
import './PersonnelInfo.css';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { currentuser } from "../App";

const PersonnelInfo = (props) => {
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  //console.log(props);
  //console.log(props.location);
  const location = useLocation()
  const { from } = location.state
  //console.log(location);
  console.log(from);

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
  
  if (user.unit === 'u') {
    allow = true
  }

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

  const disallow = (
    <div className="Personnel">
      <h1>Access Denied</h1>
      <div style={{padding: 400}}></div>
    </div>
  )
    return (
      <div>
      {allow ? allowed : disallow}
    </div>
    );
  };
    
  export default PersonnelInfo;

  /*
  <h2 className="info">{Personnel.Personnel.Rank} {Personnel.Personnel.name}</h2>
        <p className="info">DODID: {Personnel.Personnel.DODID}</p>
        <p className="info">Company: {Personnel.Personnel.unit}</p>
        <p className="info">Birthdate: {Personnel.Personnel.Birthdate}</p>
        <p className="info">SSN: {Personnel.Personnel.ssn}</p>
        <p className="info">Address: {Personnel.Personnel.Address}</p>
        <p className="info">Status: {Personnel.Personnel.Status}</p> */