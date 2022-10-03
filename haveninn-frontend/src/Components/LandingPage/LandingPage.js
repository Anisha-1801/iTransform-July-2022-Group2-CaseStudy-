import React, { Component } from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import Introduction from "./Introduction/Introduction";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Introduction/>
        LandingPage
        <Footer />
      </div>
    );
  }
}
export default LandingPage;