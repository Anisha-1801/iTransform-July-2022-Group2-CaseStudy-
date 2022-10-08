import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./styles.css";

export default class RoomCarousel extends Component {
  render() {
    return (
      <div> 
        {/* CAROUSEL */}
        <section id="testimonials">
          <Carousel fade>
            <Carousel.Item className ="carousel-item" interval={6000}>
              <img
                className="test-img img1"
                src={require("./images/room.jpg")}
                alt="First slide"
              />
              <Carousel.Caption>
                <div className="box">
                <h2 className="testimonial-text">Luxurious Room, for anyone and everyone</h2>
                <em>Different room types to cater everyone's needs</em>
                </div>
              </Carousel.Caption>
              
            </Carousel.Item>
            <Carousel.Item className="carousel-item" interval={6000}>
               <img
                className="test-img img2"
                src={require("./images/food-table.jpg")}
                alt="Second slide"
              />
              <Carousel.Caption>
              <div className="box">
                <h2 className="testimonial-text">Find yourself Safe in this Haven</h2>
                <em>Amazing Staff, to deliver extra ordinary service to make you feel at home.</em>
              </div>
              </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className ="carousel-item" interval={5000}>
                <img
                  className="test-img img3"
                  src={require("./images/amenities.jpg")}
                  alt="Third slide"
                />
                <Carousel.Caption>
                <div className="box">
                <h2 className="testimonial-text">Amazing Services, Greater Joy!</h2>
                <em>Enjoy high class services provided exclusively which will elevate your experience</em>
                </div>
               </Carousel.Caption>
              </Carousel.Item>
          </Carousel>
        </section>
      </div>
    )
  }
}
