import React, { Component } from 'react'
import SearchRooms from '../Receptionist/SearchRooms'
import './Dashboard.css'
class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="intro-banner-wrap">
	        {/* <img src={require("./hotel-bg.jpg")} class="w-100 img-fluid-hotel" alt="hotel"/> */}
        </div>
        <SearchRooms/>
      </div>
    )
  }
}

export default Dashboard