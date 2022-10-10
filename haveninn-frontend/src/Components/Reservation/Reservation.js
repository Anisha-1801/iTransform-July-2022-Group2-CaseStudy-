import React,{ useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Variables from '../../Variables/Variables';
import './Reservation.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Reservation() {
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {setShow(true); setId(id)}

    const [Reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(Variables.api + "Reservations", {
            headers: { Authorization: `Bearer ${Variables.token}` }
          })
          .then((response) => response.data)
          .then(res => setReservations(res))
          .catch((error) => console.log(error));
      }, []);

    const getReservationId = id => {
      navigate('/Reservation/Update',{state:{Id:id}});
    }

    const getReservationIdforView = id => {
      navigate('/Reservation/View',{state:{Id:id}});
    }

    function deleteReservation(){
      axios.delete(Variables.api+'Reservations/'+ Id, { headers: {"Authorization" : `Bearer ${Variables.token}`} })
           .then(res => {console.log(res);
            window.location.reload();})
           .catch(err => console.log(err))
    }

    
  return (
    <div className="reservation-container">
    <div className="row">
    <div className="col-lg-9">
      <h3 className='label-heading'>Reservations</h3>
    </div>
    <div className="col-lg-3">
      <a className="btn btn-outline-warning btn-lg mt-5 mb-3" href="/Reservation/Add">
      <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
        Add</a>
    </div>
    </div>
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
        <button className="btn btn-outline-warning mb-5 me-1" onClick={()=>{getReservationIdforView(r.ReservationId)}}>
          <i className="fa fa-eye" aria-hidden="true"></i> View
        </button>
        <a href="/Reservation/Update" className="btn btn-outline-warning mb-5 me-1" onClick={()=>{getReservationId(r.ReservationId)}}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update
        </a>
        <button className="btn btn-outline-danger mb-5 me-1" onClick={()=>{handleShow(r.ReservationId)}}>
          <i className="fa fa-trash" aria-hidden="true"></i> Delete
        </button>
      </div>
      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{color:"red"}}></i> Delete Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
          <p>Do you really want to delete this record? This process cannot be undone.</p>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteReservation}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
))}
</div>
  )
}

export default Reservation