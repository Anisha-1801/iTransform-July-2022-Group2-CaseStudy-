import React, { Component } from 'react';
import './Features.css';

export default class Features extends Component {
  render() {
    return (
        <div>
          <section id="features">
            <div className="row">
                <div className="feature-box col-lg-4">
                    <i className="logo fas fa-bed fa-4x"></i>
                    <h3 className="f1">Rooms for all.</h3>
                    <p className="f2">Find your own Safe Haven.</p>
                </div>
                <div className="feature-box col-lg-4">
                    <i className="logo fas fa-check-circle fa-4x"></i>
                    <h3 className="f1">Elite Hospitality.</h3>
                    <p className="f2"> Amazing Staff always available to cater your needs.</p>
                </div>
                <div className="feature-box col-lg-4">
                    <i className="logo fas fa-credit-card fa-4x"></i>
                    <h3 className="f1">Amazing Rates.</h3>
                    <p className="f2">Luxury and Affordability at one place.</p>
                </div> 
            </div>
          </section> 
  </div>
    )
  }
}
