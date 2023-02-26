import React from "react";
import './App.css';
import Search from './pages/Search';
// import initialDetails from './data/initialDetails';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Navbar from "./components/Navbar";
import EnterNewPersonnel from './pages/EnterNewPersonnel';
import LogOut from './pages/LogOut';
import Sort from "./pages/Sort";
import UpdateExistingPersonnel from "./pages/UpdateExistingPersonnel";
import UpdatePersonnelConfirm from "./pages/UpdatePersonnelConfirm";
// import Home from './pages';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path='/EnterNewPersonnel' element={<EnterNewPersonnel/>} />
        <Route path='/Search' element={<Search/>} />
        <Route path='/Sort' element={<Sort/>} />
        <Route path='/LogOut' element={<LogOut/>} />
        <Route path='/UpdateExistingPersonnel' element={<UpdateExistingPersonnel/>} />
        <Route path='/UpdatePersonnelConfirm' element={<UpdatePersonnelConfirm/>} />
    </Routes>
    </Router>
  );
}

export default App;
