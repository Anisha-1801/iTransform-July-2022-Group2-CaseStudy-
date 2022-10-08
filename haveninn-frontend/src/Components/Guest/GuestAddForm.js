import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';
// import { Alert } from 'react-bootstrap';

class GuestAddform extends Component {
  constructor(props) {
    super(props)

    this.state = {
      GuestId: '',
      Name: '',
      Email: '',
      MobileNo: '',
      AadharCardNo: ''

    }
    this.changenameHandler = this.changenameHandler.bind(this);
    this.changeemailHandler = this.changeemailHandler.bind(this);
    this.changemobilenoHandler = this.changemobilenoHandler.bind(this);
    this.changeaadharcardnoHandler = this.changeaadharcardnoHandler.bind(this);
    this.addguesthandler = this.addguesthandler.bind(this);

  }
 
  changenameHandler = (e) => {
    this.setState({ Name: e.target.value })
  }
  changeemailHandler = (e) => {
    this.setState({ Email: e.target.value })
  }
  changemobilenoHandler = (e) => {
    this.setState({ MobileNo: e.target.value })
  }
  changeaadharcardnoHandler = (e) => {
    this.setState({ AadharCardNo: e.target.value })
  }
  addguesthandler = (e) => {
    let Guest = { Name: this.state.Name, Email: this.state.Email, MobileNo: this.state.MobileNo, AadharCardNo: this.state.AadharCardNo }
    console.log(Guest)
    axios.post(Variables.api + 'Guests', Guest,{ headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => { alert(res) })
      .catch(err => alert(err))
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                <h3>AddGuest</h3>
              }
              <div className="card-body">
                <form >
                  <div className="form-group">
                    <label> Name: </label>
                    <input placeholder="Name" name="Name" className="form-control"
                      value={this.state.Name} onChange={this.changenameHandler} />
                  </div>
                  <div className="form-group">
                    <label> Email: </label>
                    <input placeholder="Email" name="Email" className="form-control"
                      value={this.state.Email} onChange={this.changeemailHandler} />
                  </div>
                  <div className="form-group">
                    <label> MobileNo: </label>
                    <input placeholder="MobileNo" name="MobileNo" className="form-control"
                      value={this.state.MobileNo} onChange={this.changemobilenoHandler} />
                  </div>
                  <div className="form-group">
                    <label> AadharCardNo: </label>
                    <input placeholder="AadharCardNo" name="AadharCardNo" className="form-control"
                      value={this.state.AadharCardNo} onChange={this.changeaadharcardnoHandler} />
                  </div>

                  <button className="btn btn-success" onClick={this.addguesthandler}>Create</button>
                  {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button> */}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default GuestAddform