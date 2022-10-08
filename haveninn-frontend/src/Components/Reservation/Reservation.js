import React, { Component } from "react";
import axios from "axios";
import Variables from "../../Variables/Variables";
import "./Reservation.css";

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Reservations: []
    };
  }

  componentDidMount() {
    axios.get(Variables.api + "Reservations", {
        headers: { Authorization: `Bearer ${Variables.token}` }
      })
      .then((response) => response.data)
      .then(res => {
        this.setState({
          Reservations: res
        });
      })
      .catch((error) => console.log(error));
  }
  // eslint-disable-next-line
  render() {
    const { Reservations } = this.state;
    return (
          <div className="reservation-container">
            <h3 className="label-heading">Reservation Details</h3>
              {Reservations.map(r => (
            <div className="row m-1" key={r.ReservationId}>
              <div className="r-card card mb-2">
                <div className="card-body">
              <div className="r-card-section col-lg-3 col-md-3 col-sm-12">
                <h5 className="para-head">
                  Reservation Id : {r.ReservationId}
                </h5>
                <p className="para-text">
                  <b>Guest: </b>
                  {r.Guest.Name}
                  <br />
                  <b>Email: </b>
                  {r.Guest.Email}
                  <br />
                  <b>Adults: </b> {r.NumberOfAdults} &nbsp;&nbsp;
                  <b>Children: </b> {r.NumberOfChildren}
                </p>
              </div> 
              <div className="r-card-section col-lg-3 col-md-3 col-sm-12">
                <p className="para-text">
                  <b>Room Number : </b> {r.Room.RoomId}
                  <br />
                  <b>Service: </b> {r.Service.ServiceName} &nbsp;  
                  <br />
                  <b>Nights : </b> {r.NoOfNights}
                  <br />
                </p>
              </div>
              <div className="r-card-section col-lg-3 col-md-3 col-sm-12">
                <p className="para-text">
                  <b>Check-In : </b> {new Date(r.CheckIn).toLocaleString()}
                  <br />
                  <b>Check-Out : </b> {new Date(r.CheckOut).toLocaleString()}
                  <br />
                  <b>Booking Time : </b> {r.BookingTime}
                </p>
              </div>
              <div className="r-card-section col-lg-3 col-md-3 col-sm-12">
                <button className="btn btn-outline-warning mb-5 me-1">
                  <i className="fa fa-eye" aria-hidden="true"></i> View
                </button>
                <a href="/Reservation/Update" className="btn btn-outline-warning mb-5 me-1">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update
                </a>
                <button className="btn btn-outline-danger mb-5 me-1">
                  <i className="fa fa-trash" aria-hidden="true"></i> Delete
                </button>
              </div>
              </div>
              </div>
            </div>
        ))}
        </div>
    );
  }
}

export default Reservation;
