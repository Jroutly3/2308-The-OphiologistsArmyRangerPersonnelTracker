import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // User Login info
    const database = [
      {
        username: "admin",
        password: "passadmin"
      },
      {
        username: "regularuser",
        password: "passreg"
      }
    ];

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
     <div className="form">
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

   return (
    <div className="login-form">
        <div className="title">Sign In</div>
        
        {isSubmitted ? <Link to="/Welcome">Enter site </Link> : renderForm}
    </div>
  );
}
//{isSubmitted ? <div>User is successfully logged in</div> : renderForm}
export default Login;