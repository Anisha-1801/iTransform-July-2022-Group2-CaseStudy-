import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import { useNavigate } from 'react-router-dom';
import "./Services.css"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Services() {

    const [Services, setService] = useState([])
    const navigate = useNavigate();

    const getServiceId = id => {
        navigate('/Services/Update', { state: { Id: id } });
    }

    const [show, setShow] = useState(false);
    const [Id, setId] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id)
    }
    function deleteservice() {
        axios.delete(Variables.api + 'Services/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))

    }



    useEffect(() => {
        axios.get(Variables.api + 'Services', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => setService(res))
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <>
                <div className='r-container'>
                    <div className="container mt-5 mb-5">
                        <div className="d-flex justify-content-center">
                            <h1 className='label-heading'>Services
                                <a className='add-guest text-warning' href="/Services/Add">
                                    &nbsp;&nbsp;
                                    <i className="fa fa-plus-circle"></i></a>
                            </h1>
                        </div>
                        <div className="row">
                            {Services.map(service => (
                                <div className="col-md-4"
                                    key={service.ServiceId}>
                                    <article className="card mb-3 room-card p-3">
                                        <div className="row no-gutters">
                                            <div className="col-md-9">
                                                <div className="m-2">
                                                    <h5><b>Service Id: {service.ServiceId}</b></h5>
                                                    <p><b>Name:</b> {service.ServiceName}</p>
                                                    <p><b>Price: </b>₹ {service.Price}</p>
                                                </div>
                                            </div>
                                            <aside className="col-md-3">
                                                <div>
                                                    <div className="d-grid gap-3 d-md-flex justify-content-md-right ms-1 mt-4 fs-5">
                                                        <a  href="/Services/Update" onClick={() => getServiceId(service.ServiceId)}>

                                                            <i className="far fa-edit text-warning"></i>
                                                        </a>
                                                        <a href="#" onClick={() => { handleShow(service.ServiceId) }}>
                                                            <i className='fa fa-trash text-danger'></i>
                                                        </a>
                                                        <Modal show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete Service</Modal.Title>
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
                                                                <Button variant="danger" onClick={deleteservice}>
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
            </>
        </div>

    )
}

export default Services
