import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Bill() {

    const [Bills, setBill] = useState([])

    const [show, setShow] = useState(false);
    const [Id, setId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
    setShow(true);
    setId(id)
    }
    
    function deleteBill() {
    axios.delete(Variables.api + 'Bills/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err))

  }

    useEffect(() => {
        axios.get(Variables.api + 'Bills', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => setBill(res))
            .catch(error => console.log(error))
    }, [])


    return (
        <div className='r-container'> 
            <>
                <div className=" mt-5 mb-5">
                <div className="d-flex justify-content-center">
                    <h1 className='label-heading'>Bills 
                        <a className='add-guest text-warning' href="/Bill/Add">
                        &nbsp;&nbsp;
                        <i className="fa fa-plus-circle"></i></a>
                    </h1>
                    </div>
                    <div className="row">
                        {Bills.map(bill => (
                            <div className="col-md-6"
                            key={bill.BillId}>
                                <article className="card mb-3 room-card p-3">
                                    <div className="row no-gutters">
                                        <div className="col-md-5">
                                            <div className="ms-2" >
                                                <a href="/billlist" className='mb-2'>
                                                <h3 className='para-head'>Bill Id : {bill.BillId}</h3></a>
                                                <p><b>Payment Mode :</b> {bill.PaymentMode}</p>
                                                <p><b>ReservationId : </b> {bill.ReservationId}</p>
                                                <p><b>Total Price : </b> ₹ {bill.TotalPrice}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="mt-2"><br/>
                                                <p><b>Payment Time : </b>{new Date(bill.PaymentTime).toLocaleTimeString()}</p>
                                                <p><b>Transaction Id : </b>{bill.TransactionId == null ? "None" : <>{bill.TransactionId}</>}</p>
                                                <p><b>Status : </b>{bill.Status}</p>
                                            </div>
                                        </div> 
                                        <aside className="col-md-2 mt-2">
                                            <div className="d-grid gap-3 d-md-flex justify-content-md-center ms-1 mt-5 fs-5">
                                                    <a href="#" onClick={() => { handleShow(bill.BillId) }} >
                                                        <i className='fa fa-trash text-danger'></i>
                                                    </a>
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
                <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete Bill</Modal.Title>
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
                <Button variant="danger" onClick={deleteBill}>
                Confirm Delete
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Bill