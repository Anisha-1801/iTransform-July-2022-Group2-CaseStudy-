import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Users() {
  const [Users, setUsers] = useState([])
  const navigate = useNavigate();

  
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
      setShow(true);
      setId(id)
  }
  function deleteuser() {
      axios.delete(Variables.api + 'Users/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
          .then(res => {
              console.log(res);
              window.location.reload();
          })
          .catch(err => console.log(err))

  }

  useEffect(() => {
    axios.get(Variables.api + 'Users', { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(response => response.data)
      .then(res => setUsers(res))
      .catch(error => console.log(error))
  }, [])



  return (
    <>
    {Variables.isUserLoggedin ? 
    <div className="r-container">
      <div className="d-flex justify-content-center">
        <h1 className='label-heading'>Users
          <a className='add-guest text-warning' href="/Users/Add">
            &nbsp;&nbsp;
            <i className="fa fa-plus-circle"></i></a>
        </h1>
      </div>
      <div className="row">
        {Users.map(user => (
          <div className="col-sm-6" key={user.UserId}>
            <article className="card mb-3 room-card p-3" key={user.UserId}>
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="ms-2">
                    <a href="/inventory" className='mb-2'>
                      <h3 className='para-head'>User Id : {user.UserId}</h3>
                    </a>
                    <p className="para-text">
                      <b>Staff Id : {user.StaffId}</b><br />
                      <b>Role :</b> {user.Role}<br />
                      <b>Email :</b> {user.Email}
                    </p>
                  </div>
                </div>
                <aside className="col-md-6 mt-3">
                  <div className="d-grid gap-3 d-md-flex justify-content-md-center mt-4">
                    <a href="#" className='ms-2' onClick={() => handleShow(user.UserId)} >
                      <i className='fa fa-trash fs-3 text-danger'></i>
                    </a>
                  </div>
                </aside>
              </div>
            </article>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete User</Modal.Title>
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
          <Button variant="danger" onClick={deleteuser}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
 :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
 </>
  )
}

export default Users;