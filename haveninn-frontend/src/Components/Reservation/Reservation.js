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
    <>
        {Variables.isUserLoggedin ? 
    <div className="reservation-container">
    <div className="d-flex justify-content-center">
          <h1 className='label-heading'>Reservations
            <a className='add-guest text-warning' href="/Reservation/Add">
            &nbsp;&nbsp;
            <i className="fa fa-plus-circle"></i></a>
          </h1>
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
          <b>Check-In : </b> {new Date(r.CheckIn).toLocaleDateString()}
          <br />
          <b>Check-Out : </b> {new Date(r.CheckOut).toLocaleDateString()}
          <br />
          <b>Booking Time : </b> {new Date(r.BookingTime).toLocaleTimeString()}
        </p>
      </div>
      <div className="r-card-section col-lg-3 col-md-3 col-sm-12 ">
        <a href="/Reservation/Update" className="mb-5 me-1" onClick={()=>{getReservationId(r.ReservationId)}}>
          <i  className="far fa-edit fs-4 text-warning" aria-hidden="true"></i>
        </a> &nbsp;
        <a className="mb-5 me-1" onClick={()=>{handleShow(r.ReservationId)}}>
          <i  className="fa fa-trash fs-4 text-danger" aria-hidden="true"></i>
        </a>
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
:<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
</>
  )
}

export default Reservation