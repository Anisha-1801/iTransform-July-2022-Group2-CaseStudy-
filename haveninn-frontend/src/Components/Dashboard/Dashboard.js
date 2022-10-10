import React, { Component } from 'react'
import SearchRooms from '../Receptionist/SearchRooms'
import './Dashboard.css'
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="">
        <img className="recep" src={require("./Images/hotel.png")} alt="receptionist dashboard"/>
          <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item active">
              <a class="nav-link" href="/searchroom">Rooms</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="/Guest">Guest</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Reservation">Reservation</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Department">Department</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Inventory">Inventory</a>
            </li>
          </ul>
        </div>
        <SearchRooms/>
      </div>
    )
  }
}

export default Dashboard