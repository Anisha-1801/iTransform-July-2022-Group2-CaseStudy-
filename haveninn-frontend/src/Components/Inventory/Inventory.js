import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Variables from '../../Variables/Variables';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';


function Inventory() {
  const [Inventory, setInventory] = useState([])
  const navigate = useNavigate();

  const getInventoryId = id => {
    navigate('/updateinventory', { state: { Id: id } });
  }
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id)
  }

  function deleteInventory() {
    axios.delete(Variables.api + 'Inventories/' + Id, { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err))

  }

  useEffect(() => {
    axios.get(Variables.api + 'Inventories', { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(response => response.data)
      .then(res => setInventory(res))
      .catch(error => console.log(error))
  }, [])
  return (
    <div className='r-container'>
      <div className="d-flex justify-content-center">
        <h1 className='label-heading'>Inventory
        <a className='add-guest text-warning' href="/Inventory/Add">
          &nbsp;&nbsp;
        <i className="fa fa-plus-circle"></i></a>
        </h1>
      </div>
          <div className="row">
            {Inventory.map(inventory => (
              <div className="col-sm-6">
                <article className="room-card card mb-3 inventory-card p-3" key={inventory.InventoryId}>
                  <div className="row no-gutters">
                    <div className="col-md-5">
                        <a href="/inventory" className='mb-2'>
                          <h3 className='para-head'>Inventory Id : {inventory.InventoryId}</h3>
                        </a>
                        <p className="para-text">
                          <b>Category :</b> {inventory.Category} <br />
                          <b>Quantity :</b> {inventory.Quantity}
                        </p>
                    </div>
                    <aside className="col-md-5">
                      <div>
                        <a href="/Inventory">
                          <h5 className='para-head'>Unit Price : &#8377;{inventory.UnitPrice}</h5>
                        </a>
                        <p className="mt-2"><b>Status : </b>{String(inventory.IsStockAvailable) ? "Available" : "Out Of Stock"}</p>
                        <p className="mt-3">
                          {inventory.IsStockAvailable ? <button className="btn btn-outline-success ">
                            <i className="fa fa-box ms-2" aria-hidden="true"></i> &nbsp; In Stock</button> :
                            <button className="btn btn-warning ms-2" disabled><i className="fa fa-check" aria-hidden="true"></i> OutOfStock</button>}
                        </p>

                      </div>
                    </aside>
                    <aside className='col-md-1'>
                      <div class="d-grid gap-3 d-flex justify-content-left">
                        <a href="/Inventory/Update" className='text-warning' onClick={() => { getInventoryId(inventory.InventoryId) }}>
                          <i className="fa fa-edit fs-4"></i>
                        </a>
                        <a href="#" className='text-danger' onClick={() => { handleShow(inventory.InventoryId) }}>
                          <i className='fa fa-trash fs-4'></i>
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
          <Button variant="danger" onClick={deleteInventory}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default Inventory