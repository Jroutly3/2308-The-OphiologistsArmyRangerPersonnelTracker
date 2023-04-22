import React, { useState } from "react";
import './App.css';
import Search from './pages/Search';
//import initialDetails from './data/initialDetails';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from "./components/Navbar";
import EnterNewPersonnel from './pages/EnterNewPersonnel';
import LogOut from './pages/LogOut';
import Sort from "./pages/Sort";
import UpdateExistingPersonnel from "./pages/UpdateExistingPersonnel";
import UpdatePersonnelConfirm from "./pages/UpdatePersonnelConfirm";
 import PersonnelInfo from "./pages/PersonnelInfo";
import Python from "./pages/Python";
import Welcome from "./pages/Welcome";
import { Link } from "react-router-dom";
import NewPersonnelConfirm from "./pages/NewPersonnelConfirm";




const database = [
  {
    username: "admin",
    password: "passadmin",
    unit: "u" 
  },
  {
    username: "regularuser",
    password: "passreg",
    unit: ["1", "3", "5", "7"]
  },
  {
    username: "1",
    password: "1",
    unit: ["1", "3", "5", "7"]
  }
];

var loggeduser = {
  username: "",
  password: "",
  unit: "" 
}

function App() {

  var backGround = {
    backgroundColor: '#EBF7F5'
  }
  var logstyle = {
    backgroundColor: '#EBF7F5',
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
  }

  var padstyle = {
    backgroundColor: '#EBF7F5',
    padding: 50,
  }
  var logpadstyle = {
    backgroundColor: '#EBF7F5',
    padding: 500,
  }
  const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // User Login info
    

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    
    const handleSubmit = (event) => {
        //Prevent page reload
        if (isSubmitted === false) {
            event.preventDefault();
        }
      
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
        loggeduser = userData;
    
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
          } else {
            setIsSubmitted(true);
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        }
      };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    // JSX code for login form
   const renderForm = (
     <div className="form" style={logstyle}>
       <form onSubmit={handleSubmit}>
         <div className="input-container">
           <label>Username </label>
           <input type="text" name="uname" required />
           {renderErrorMessage("uname")}
         </div>
         <div className="input-container">
           <label>Password </label>
           <input type="password" name="pass" required />
           {renderErrorMessage("pass")}
         </div>
         <div className="button-container">
           <input type="submit" />
         </div>
       </form>
     </div>
   );

   const loggs = (
    <div className="login-form">
        <div style={padstyle}></div>
        <div className="title" style={logstyle}>Sign In</div>
        
        {isSubmitted ? <Link to="/PersonnelInfo">Enter site </Link> : renderForm}
        <div style={logpadstyle}></div>
    </div>
   )

   const logins = (<div style={backGround}>
    <Router>
    <Navbar />
    <Routes>
        <Route path='/EnterNewPersonnel' element={<EnterNewPersonnel/>} style={backGround}/>
        <Route path='/Search' element={<Search/>} style={backGround} />
        <Route path='/Sort/*' element={<Sort/>} style={backGround} />
        <Route path='/LogOut' element={<LogOut/>} style={backGround} />
        <Route path='/UpdateExistingPersonnel' element={<UpdateExistingPersonnel/>} style={backGround} />
        <Route path='/UpdatePersonnelConfirm' element={<UpdatePersonnelConfirm/>} style={backGround} />
        <Route path='/NewPersonnelConfirm' element={<NewPersonnelConfirm/>} style={backGround} />
        <Route path="/PersonnelInfo" element={<PersonnelInfo/>} style={backGround} />
        <Route path="/" element = {<Welcome/>} style={backGround} />
        <Route path="/Python" element = {<Python/>} style={backGround} />
    </Routes>
    </Router>
    </div>)

  return (
    <div>
      {isSubmitted ? logins : loggs}
    </div>
  );
}
//<Route path="/PersonnelInfo" element={<PersonnelInfo/>} />  Personnel = {initialDetails.initialDetails[1]} render={(props) => <PersonnelInfo {...props}

export default App;

export function currentuser() {
  return loggeduser
}