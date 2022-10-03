import React, { Component } from "react";
import './Intro.css'
import './hotel-bg.jpg'

class Introduction extends Component {
  render() {
    return (
 
        <div class="intro-banner-wrap">
	        <img src={require("./hotel-bg.jpg")} class="w-100 img-fluid-hotel" alt="hotel"/>
        </div>

    );
  }
}
export default Introduction;