import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Variables from '../../Variables/Variables';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';

function Room() {
  const [roomDetail, setRoomDetail] = useState([])
  const navigate = useNavigate();


  const getroomId = id => {
    navigate('/Room/Update', { state: { Id: id } });
  }


  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id)
  }



  function deleteRoom() {
    axios.delete(Variables.api + 'Rooms/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err))

  }

  useEffect(() => {
    axios.get(Variables.api + 'Rooms', { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(response => response.data)
      .then(res => setRoomDetail(res))
      .catch(error => console.log(error))
  }, [])


  return (
    <div className='r-container'>
      <div className="container r-container">
      <div className="d-flex justify-content-center">
          <h1 className='label-heading'>Rooms
            <a className='add-room text-warning' href="/Room/Add">
            &nbsp;&nbsp;
            <i className="fa fa-plus-circle"></i></a>
          </h1>
          </div>
        <div className="row">

          {roomDetail.map((room) => (
            <div className="col-sm-6" key={room.RoomId}>
              <article className="card mb-3 room-card p-3">
                <div className="row no-gutters">
                  <div className="col-md-8">
                    <div className="ms-2">
                      <a href="/Rooms" className='mb-2'>
                        <h3 className='para-head'>Room Number : {room.RoomId}</h3>
                      </a>
                      <p className="para-text">
                        <b>Description :</b> {room.Description} <br />
                        <b>Type :</b> {room.RoomType.RoomTypeName}
                      </p>
                    </div>
                  </div>
                  <aside className="col-md-4">
                    <div>
                      <span className="h3">&#8377; {room.RoomType.Price}</span>
                      <small className="text-muted">/per night</small>
                      <p className="mt-2"><b>Status:</b> {room.IsAvailable ? "Available" : "Not Available"}</p>
                      <p className="mt-3">
                        {room.IsAvailable ? <button className="btn btn-outline-success">
                          <i class="fa fa-bed" aria-hidden="true"></i> Reserve</button> :
                          <button className="btn btn-warning" disabled><i className="fa fa-check" aria-hidden="true"></i> Booked</button>}
                      </p>
                      <div class="d-grid gap-3 d-md-flex justify-content-md-right">

                        <a href="/Room/Update" className='mb-2' onClick={() => getroomId(room.RoomId)}>
                          <i className="fa fa-edit fs-5 text-warning"></i>
                        </a>
                        <a href="#" className="mb-5 me-1" onClick={() => { handleShow(room.RoomId) }}>
                          <i className="fa fa-trash fs-5 text-danger" aria-hidden="true"></i>
                        </a>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete Room</Modal.Title>
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
                            <Button variant="danger" onClick={deleteRoom}>
                              Confirm Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Room





















