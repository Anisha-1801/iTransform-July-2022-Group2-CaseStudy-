import axios from 'axios'
import React, { Component } from 'react'
import Variables from '../../Variables/Variables'
import '../Inventory/Inventory.css'


class Inventory extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        Inventory: []
      }
    }

    componentDidMount(){
        
        axios.get(Variables.api + 'Inventories', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        //.then(response => console.log(response.data))
        .then(response => response.data)
        .then(res => { this.setState({
           Inventory : res
        })})
        .catch( error => alert(error))
    }
    render() {
      const {Inventory} = this.state; 
      return (
      <div className="container mt-4 mb-4">
        <div className="row">
            <a className='btn btn-outline-warning' href="/Inventory/Add"> Addd</a>
          {Inventory.map(inventory =>(
            <div className="col-sm-6" key={inventory.InventoryId}>
              <article className="card mb-3 inventory-card p-3" key={inventory.InventoryId}>
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <div className="ms-2">
                      <a href="/inventory" className='mb-2'>
                        <h3 className='inventoryh3'>Inventory Id : {inventory.InventoryId}</h3>
                      </a>
                      <p className="para-text">
                        <b>Category :</b> {inventory.Category} <br/>
                        <b>Quantity :</b> {inventory.Quantity}
                      </p>
                      
                    </div>
                  </div>
                  <aside className="col-md-6">
                    <div>
                      <a href="/inventory" className='mb-2'>
                        <h4 className='inventoryh3'>Unit Price : &#8377;{inventory.UnitPrice}</h4>
                      </a>
                        
                        <p className="mt-2"><b>Status : </b>{String(inventory.IsStockAvailable) ? "Available" : "Out Of Stock"}</p>
                        <p className="mt-3">
                        {inventory.IsStockAvailable ? <button className="btn btn-outline-success ">
                            <i className="fa fa-box ms-2" aria-hidden="true"></i> InStock</button>: 
                            <button className="btn btn-warning ms-2" disabled><i className="fa fa-check" aria-hidden="true"></i> OutOfStock</button> }
                      </p>  
                     
                    </div> 
                  </aside>
                  <aside className='col-md-4 '>
                    <div className="d-grid gap-3 d-md-flex justify-content-md-left">
                          <a href="/viewinventory "className='ms-2'>
                            <i className="fa fa-eye fs-5" aria-hidden="true"></i>
                          </a>
                          <a href="/editiventory" className='ms-2'>
                            <i className="fa fa-edit fs-5"></i>
                            </a>
                          <a href="/deleteinventory" className='ms-2'>
                            <i className='fa fa-trash fs-5'></i>
                          </a>
                      </div>
                  </aside>
                </div>
              </article>
            </div>
            ))}
      </div>
        </div>
    )
  }
}

export default Inventory