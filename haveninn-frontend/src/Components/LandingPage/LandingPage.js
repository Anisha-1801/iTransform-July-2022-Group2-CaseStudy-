import React, { Component } from "react";
import Introduction from "./Introduction/Introduction";
import RoomCarousel from "./Carousel/RoomCarousel";
import Features from "./Features/Features";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Introduction/>
        <Features/>
        <RoomCarousel/>
 
      </div>
    );
  }
}
export default LandingPage;