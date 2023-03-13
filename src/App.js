import React from "react";
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
// import Home from './pages';

function App() {
  var backGround = {
    backgroundColor: '#EBF7F5'
  }
  return (
    <div style={backGround}>
    <Router>
    <Navbar />
    <Routes>
        <Route path='/EnterNewPersonnel' element={<EnterNewPersonnel/>} style={backGround}/>
        <Route path='/Search' element={<Search/>} style={backGround} />
        <Route path='/Sort/*' element={<Sort/>} style={backGround} />
        <Route path='/LogOut' element={<LogOut/>} style={backGround} />
        <Route path='/UpdateExistingPersonnel' element={<UpdateExistingPersonnel/>} style={backGround} />
        <Route path='/UpdatePersonnelConfirm' element={<UpdatePersonnelConfirm/>} style={backGround} />
        <Route path="/PersonnelInfo" element={<PersonnelInfo/>} style={backGround} />
        
    </Routes>
    </Router>
    </div>
  );
}
//<Route path="/PersonnelInfo" element={<PersonnelInfo/>} />  Personnel = {initialDetails.initialDetails[1]} render={(props) => <PersonnelInfo {...props}

export default App;
