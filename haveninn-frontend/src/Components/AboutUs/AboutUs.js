import React, { Component } from "react";
import "./AboutUs.css";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus">
        <h1 id="about-head">HavenInn - Hotel Management System</h1>
        <h5 className="about-text">
          The purpose of <i>HavenInn</i> is to simplify the
          day-to-day processes of the hotel. The system will be able to handle
          multiple tasks in an efficient manner. As a solution to a large amount
          of file handling happening at the hotel, it will be used to
          overcome those drawbacks. Ease of use and most importantly the
          efficiency of information retrieval are some benefits of the system.
          HavenInn is user-friendly, provide easy recovery of errors, and
          have an overall end-user high subjective satisfaction.
        </h5>
        <br />
        <p id="quote">
          <em>Ubran Living luxuriously redefined</em>
        </p>
        <div className="about-foot">
          <i className="paw fa fa-star fa-2x"></i>
          <i className=" paw fa fa-star fa-2x"></i>
          <i className=" paw fa fa-star fa-2x"></i>
          <i className=" paw fa fa-star fa-2x"></i>
          <i className=" paw fa fa-star fa-2x"></i>
        </div>
      </div>
    );
  }
}

export default AboutUs;
