import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';
// import { Alert } from 'react-bootstrap';
import "./Services.css"

class AddServicesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
     ServiceId: '',
      ServiceName: '',
      Price: ''

    }
   
    this.changeservicenameHandler = this.changeservicenameHandler.bind(this);
    this.changepriceHandler = this.changepriceHandler.bind(this);
    
    this.addservicehandler = this.addservicehandler.bind(this);

  }
 
  changeservicenameHandler = (e) => {
    this.setState({ ServiceName: e.target.value })
  }
  changepriceHandler = (e) => {
    this.setState({ Price: e.target.value })
  }

  addservicehandler = (e) => {
    let Service = { ServiceName: this.state.ServiceName, Price: this.state.Price }
    console.log(Service)
    axios.post(Variables.api + 'Services', Service,{ headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => { console.log(res) })
      .catch(err => alert("Something went wrong, Try Again later!"))
  }
  render() {
    return (
      <>
      {Variables.isUserLoggedin ? 
      <div>
        <div className='r-container'>
        <div className="r-container">
          <div className="row">
            <div className="rf-card card col-md-6 offset-md-3 offset-md-3">
              {
                <center><h3 className='label-heading' >Add Services</h3></center>
              }
              <div className="card-body">
                <form action='/Services'>
                
                  <div className="form-group">
                  <label className="form-label">  Service Name :</label>
                    <input placeholder="Enter Service Name" name="Service Name" className="form-control" required={true}
                      value={this.state.ServiceName} onChange={this.changeservicenameHandler} />
                  </div>
                  
                  <div className="form-group">
                  <label className="form-label">  Price : </label>
                    <input placeholder="Enter Price" name="Price" className="form-control" required={true}
                      value={this.state.Price} onChange={this.changepriceHandler} />
                  </div>
             
                  <center><button className="btn btn-warning mt-3" onClick={this.addservicehandler}>
                    <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Add</button></center>
                 
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
      :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
      </>
    )
  }
}

export default AddServicesForm