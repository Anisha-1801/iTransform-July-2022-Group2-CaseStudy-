import React, { useState, useEffect } from "react";
import axios from "axios";
import Variables from "../../Variables/Variables";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Guest.css'

function Guest() {
  const [Guests, setGuest] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {setShow(true); setId(id)}

  const getGuestId = (id) => {
    navigate("/Guest/Update", { state: { Id: id } });
  };

  useEffect(() => {
    axios
      .get(Variables.api + "Guests", {
        headers: { Authorization: `Bearer ${Variables.token}` },
      })
      .then((response) => response.data)
      .then((res) => setGuest(res))
      .catch((error) => console.log(error));
  }, []);

  function deleteGuests() {
    axios.delete(Variables.api + 'Guests/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err))

}

  return (
    <>
    {Variables.isUserLoggedin ? 

    <div className="guest-container">
      <>
        <div className="guest-container">
          <div className="d-flex justify-content-center">
          <h1 className='label-heading'>Guests
            <a className='add-guest text-warning' href="/Guest/Add">
            &nbsp;&nbsp;
            <i className="fa fa-plus-circle"></i></a>
          </h1>
          </div>
          <div className="row">
            {Guests.map((guest) => (
              <div className="col-md-6" key={guest.GuestId}>
                <article className="card mb-3 room-card p-3">
                  <div className="row no-gutters">
                        <h3 className='para-head'><b>Guest Id: </b>
                          {guest.GuestId}
                        </h3>
                        <div className="g-para-text col-5">
                        <p>
                          <b>Name : </b> {guest.Name}
                        </p>
                        <p>
                          <b>Email : </b> {guest.Email}
                        </p>
                        </div>
                        <div className="g-para-text col-5">
                        <p>
                          <b>Mobile No. :</b> {guest.MobileNo}
                        </p>
                        <p>
                          <b>Aadhar Card No. :</b> {guest.AadharCardNo}
                        </p>
                        </div>
                    <aside className="col-1">
                      <div>
                        <div className="d-grid gap-3 d-flex justify-content-around me-1">
                          <a href="/Guest/Update">
                            <i
                              className="far fa-edit fs-4 text-warning"
                              onClick={() => getGuestId(guest.GuestId)}
                            ></i>
                          </a>
                          <a href="#">
                            <i
                              className="fa fa-trash fs-4 text-danger"
                              onClick={() => handleShow(guest.GuestId)}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </aside>
                  </div>
                </article>
              </div>
            ))}
                  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{color:"red"}}></i> Delete Guests</Modal.Title>
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
          <Button variant="danger" onClick={deleteGuests}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      </>
    </div>
     :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
     </>
  );
}

export default Guest;
