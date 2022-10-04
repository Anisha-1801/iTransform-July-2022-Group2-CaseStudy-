import React, { Component } from "react";
import Navigation from "../Navigation/Navigation";
import Introduction from "./Introduction/Introduction";
import RoomCarousel from "./Carousel/RoomCarousel";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Introduction/>
        <RoomCarousel/>
      </div>
    );
  }
}
export default LandingPage;