/*This was a test page for syncing python with react to connect the frontend with the backend. We ran into security issues, resulting in this page having no functionality. We 
are leaving this file available to allow you to add python if you believe that is the best way to integrate the two. The python file in question can be found in Python.html,
which is located in our public folder. */
import React from "react";

class Python extends React.Component {
  render(){
     return (
      <div>
      <iframe src="Python.html"></iframe>
    </div>
     );
  }
}
export default Python;