import React, { Component } from 'react'
import './Dashboard.css'
import Variables from '../../Variables/Variables'
class Dashboard extends Component {
  
  render() {
    const role= Variables.Role
    if(role=="Receptionist")
    {
    return (
      <div>
        
          <>  
        {/* Receptionist */}
        <div className="dashboard">
        
          <ul class="nav nav-pills justify-content-center bg-warning">
            <li class="nav-item">
              <a class="nav-link text-dark" href="/searchroom">Rooms</a>
            </li>
             <li class="nav-item">
              <a class="nav-link text-dark" href="/Guest">Guest</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="/Reservation">Reservation</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="/Bill">Bill</a>
            </li>
          </ul>
          <img className="recep" src={require("../images/Reception.png")} alt="receptionist dashboard"/>
        </div>
        </>
        </div>
    )
    }
    else if(role=="Manager")
    {
    return (
        <div>   
          <>
        {/* Manager */}
        <div className="dashboard">
          <ul class="nav nav-pills justify-content-center  bg-warning">
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Room">Rooms</a>
            </li>
             <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Staff">Staff</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Inventory">Inventory</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Services">Services</a>
            </li>
          </ul>
          <img className="recep" src={require("../images/Manager.png")} alt="manager dashboard"/>
        </div>
        </>
        </div>
    )
    }
    else
    {
return (
    <div>   
          <>
        {/* Owner */}
        <div className="dashboard">
          <ul class="nav nav-pills justify-content-center bg-warning">
          <li class="nav-item">
              <a class="nav-link text-dark" href="/searchroom">Search Rooms</a>
            </li>
             <li class="nav-item">
              <a class="nav-link text-dark" href="/Guest">Guest</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="/Reservation">Reservation</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="/Bill">Bill</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Room">Rooms</a>
            </li>
             <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Staff">Staff</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Inventory">Inventory</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Services">Services</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Department">Department</a>
            </li>
             <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Users">Users</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/RoomType">Set Rates</a>
            </li>
            <li class="nav-item">
              <a class="d-link nav-link text-dark" href="/Reports">View Reports</a>
            </li>
            
          </ul>
          <img className="recep" src={require("../images/Owner.png")} alt="owner dashboard"/>
        </div>
        </>
      </div>
    )
  }
}
}
export default Dashboard