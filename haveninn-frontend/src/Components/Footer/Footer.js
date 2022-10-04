import React, { Component } from 'react'
import './Footer.css'
import './footer-logo.png'

 class Footer extends Component {
  render() {
    return (
      <div><footer className="footer-section">
      <div className="container">
          <div className="footer-cta pt-5 pb-5">
              <div className="row">
                  <div className="col-xl-4 col-md-4 mb-30">
                      <div className="single-cta">
                          <i className="fas fa-map-marker-alt"></i>
                          <div className="cta-text">
                              <h4>Find us</h4>
                              <span>Capgemini India Pvt Ltd, Airoli</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-md-4 mb-30">
                      <div className="single-cta">
                          <i className="fas fa-phone"></i>
                          <div className="cta-text">
                              <h4>Call us</h4>
                              <span>1234567890</span>
                          </div>
                      </div>
                  </div>
                  <div className="col-xl-4 col-md-4 mb-30">
                      <div className="single-cta">
                          <i className="far fa-envelope-open"></i>
                          <div className="cta-text">
                              <h4>Mail us</h4>
                              <span>haveninnhmsgroup2@gmail.com</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="footer-content pt-5 pb-5">
              <div className="row">
                  <div className="col-lg-8 mb-50">
                      <div className="footer-widget">
                          <div className="footer-logo">
                              <a href="/home"><img src={require("./footer-logo.png")} alt="logo"/></a>
                          </div>
                          <div className="footer-text">
                              <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                              elit,Lorem ipsum dolor sit amet.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-30">
                      <div className="footer-widget">
                          <div className="footer-widget-heading">
                              <h3>Useful Links</h3>
                          </div>
                          <ul>
                              <li><a href="/">Home</a></li>
                              <li><a href="/about">About Us</a></li>
                              <li><a href="/contact">Contact</a></li>
                              <li><a href="/team">Expert Team</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="copyright-area">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8 text-center text-lg-left">
                      <div className="copyright-text">
                          <p>Copyright &copy; 2022, All Right Reserved - Group 2</p>
                      </div>
                  </div>
                  </div>
              </div>
          </div>
  </footer></div>
    )
  }
}

export default Footer