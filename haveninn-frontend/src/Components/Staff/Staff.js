import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Variables from '../../Variables/Variables'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
import './Staff.css'

function Staff() {
  
  const [Staffs, setStaff] = useState([])
  const navigate = useNavigate();

  const getStaffId = id => {
    navigate('/Staff/Update', { state: { Id: id } });
  }
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id)
  }
    
  function deleteStaff() {
    axios.delete(Variables.api + 'Staffs/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err))

  }

  function setCorrectFormat(date){
      var now = new Date(date);
      var month = (now.getMonth() + 1);               
      var day = now.getDate();
      if (month < 10) 
          month = "0" + month;
      if (day < 10) 
          day = "0" + day;
      var today = now.getFullYear() + '-' + month + '-' + day;
      return today
    }

  useEffect(() => {
    axios.get(Variables.api + 'Staffs', { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(response => response.data)
      .then(res => setStaff(res))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
    {Variables.isUserLoggedin ? 
    <div className="staff-container">
      <>
    <div className="container mt-4 mb-4">
    <div className="d-flex justify-content-center">
          <h1 className='label-heading'>Staff
            <a className='add-guest text-warning' href="/Staff/Add">
            &nbsp;&nbsp;
            <i className="fa fa-plus-circle"></i></a>
          </h1>
          </div>
      <div className='row justify-content-center'>
        {Staffs.map(staff => (
          <div className='col-md-10'key={staff.StaffId}>
            <article className="card mb-5 room-card p-3" key={staff.StaffId}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div className="ms-3">
                    <a href="/staff" className='mb-2'>
                      <h3 className='para-head'>Staff Id: {staff.StaffId}</h3>
                    </a>
                    <p className="para-text">
                      <b>DepartmentName :</b> {staff.Department.DepartmentName} <br />
                      <b>Full Name :</b> {staff.FirstName}&nbsp;{staff.LastName}<br />
                      <b>Gender :</b> {staff.Gender}<br />
                      <b>Dob :</b> {setCorrectFormat(staff.Dob)}<br />
                    </p>
                  </div>
                </div>
                <aside className="col-md-4">
                  <div className="ms-2">
                    <a href="/staff">
                      <h3 className='para-head'>Salary : &#8377;{staff.Salary}</h3>
                        </a>
                        <div className='mt-3'>
                        <b>Address :</b> {staff.Address}<br />
                        <b>Mobile No. :</b> {staff.MobileNumber}<br />
                        <b>Mail :</b> {staff.Email}<br />
                        <b>Doj :</b> {setCorrectFormat(staff.Doj)}
                      </div>
                  </div>
                </aside>
                <aside className='col-md-2'>
                <div>
                        <div className="d-grid d-flex justify-content-around mt-5">
                          <a href="/Staff/Update">
                            <i
                              className="far fa-edit fs-4 text-warning"
                              onClick={() => getStaffId(staff.StaffId)}
                            ></i>
                          </a>
                          <a href="#">
                            <i
                              className="fa fa-trash fs-4 text-danger"
                              onClick={() => handleShow(staff.StaffId)}
                            ></i>
                          </a>
                        </div>
                      </div>
                </aside>
              </div>
                
            </article>
          </div>
        ))}
      </div>
      </div>
      </>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete Staff</Modal.Title>
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
                <Button variant="danger" onClick={deleteStaff}>
                Confirm Delete
                </Button>
            </Modal.Footer>
            </Modal>
  </div>   
   :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
   </> 
  )
}

export default Staff;