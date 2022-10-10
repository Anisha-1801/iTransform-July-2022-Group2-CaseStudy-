import React,{useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'
import Variables from '../../../Variables/Variables';
import './Form.css'

function ViewReservation() {
    const [Reservations,setReservations] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const reserveId = location.state.Id

    const getReservationId = id => {
      navigate('/Reservation/Update',{state:{Id:id}});
    }

    useEffect(() => {
        axios.get(Variables.api + `Reservations/${reserveId}`, { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => setReservations(res))
        .catch(error => console.log(error))
    },[])

  return (
    <div className="r-container">
          <div className="card rf-card">
            <div className="card-title d-flex justify-content-center">
              <h1 className="heading">Reservation Details</h1>
            </div>
            <div className="card-body">
              <div className="r-details">
              <h4 className="heading">Reservation Id : {Reservations.ReservationId}</h4>
              <hr/>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <p>
                      <strong>Check In :</strong>  {new Date(Reservations.CheckIn).toDateString()}
                      <br/>
                      <strong>Check Out :</strong>  {new Date(Reservations.CheckOut).toDateString()}
                      <br/>
                      <strong>No. of Nights :</strong>  {Reservations.NoOfNights}
                      <br/>
                      <strong>Booked At :</strong>  {new Date(Reservations.BookingTime).toLocaleTimeString()} 
                      <br/>
                      <strong>Booked By :</strong>  {Reservations.User.StaffId}
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                  <p>
                      <strong>Name :</strong>  {Reservations.Guest.Name}
                      <br/> 
                      <strong>Email:</strong>  {Reservations.Guest.Email}
                      <br/>
                      <strong>Mobile No. :</strong>  {Reservations.Guest.MobileNo}
                      <br/>
                      <strong>Aadhar Card No. :</strong>  {Reservations.Guest.AadharCardNo}
                    </p> 
                  </div>
                  <div className="col-lg-4 col-md-6 col-md-12">
                  <p>
                      <strong>Room Number :</strong> {Reservations.Room.RoomId}
                      <br/>
                      <strong>Description:</strong>  {Reservations.Room.Description}
                      <br/>
                      <strong>Service Requested :</strong>  {Reservations.Service.ServiceName}
                      <br/>
                    </p>
                  </div> 
                </div> 
                <a href="/Reservation/Update" className="btn btn-outline-warning btn-lg mb-5 me-1" onClick={()=>{getReservationId(Reservations.ReservationId)}}>
                 <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update
                </a>
              </div>
            </div>
          </div>
    </div>
 
  )
}

export default ViewReservation