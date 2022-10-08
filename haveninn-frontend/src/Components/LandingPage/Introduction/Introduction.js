import React, { Component } from "react";
import "./Intro.css";
import "./hotel-bg.jpg";

class Introduction extends Component {
  render() {
    return (
      <div className="intro-banner-wrap">
        {/* <img
          src={require("./hotel-bg.jpg")}
          class="w-100 img-fluid-hotel"
          alt="hotel"
        /> */}
        {/* CALL TO ACTION */}
        <section id="cta">
          <h3 className="cta-heading">
            Together let's redefine Urban Living luxuriously.
          </h3>
        </section>
      </div>
    );
  }
}
export default Introduction;
