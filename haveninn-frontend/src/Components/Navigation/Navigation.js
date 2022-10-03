import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import "./Navigation.css";
import "./logo.png";

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav className="my-navbar navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/" >
              <img src={require("./logo.png")} className="logo" alt="HavenInn-Logo" width="70" height="70" />
            </a>
            <h2 className="logo-text">HavenInn</h2>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
              <a className="btn btn-outline-light" href="/login">
                    <i class="fa fa-user"> </i> Log In
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
