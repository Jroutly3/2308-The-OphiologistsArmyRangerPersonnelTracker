import React,{ Image } from "react";
import logo from '../logo.png';
//import { currentuser } from "../App";

function Welcome() {
    var welcome = {
        backgroundColor: '#EBF7F5',
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        display: 'flex',
      }
    var wrap = {
        backgroundColor: '#EBF7F5',
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        display: 'flex',
    }
    return(
        <div>
            <div style={wrap}>
                <img src={logo} width="200" height="100" alignSelf = "center" alignItems="center" justifyContent="center" alt="Not found"/>
            </div>
            <div style={welcome}>75th Ranger Regiment 3rd Battalion</div>
            <div style={{padding: 10}}>Welcome to the 75th Ranger Regiment 3rd Battalion Personnel Tracker</div>
            <div style={{padding: 10}}>Search: Look for a Personnel member</div>
            <div style={{padding: 10}}>Sort: Organize all Personnel members</div>
            <div style={{padding: 10}}>Enter New Personnel: Add a Personnel member</div>
            <div style={{padding: 10}}>Update Existing Personnel: Change info about a Personnel member</div>
            <div style={{padding: 300}}></div>
        </div>
    )
}

export default Welcome