import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';


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
      <div className='r-container'>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="rf-card col-md-6 offset-md-3 offset-md-3">
              <center>
                <h3 className='label-heading'>Add Guest</h3></center>
              <div className="card-body">
                <form action = "/Reservation/Add">
                  <div className="form-group">
                    <label className="label-text"> Name* : </label>
                    <input name="Name" className="form-control" placeHolder="Enter Guest's Name" required={true}
                      value={this.state.Name} onChange={this.changenameHandler}  pattern={"[A-Za-z]"} title="Only alphabets allowed"/> 
                  </div>
                  <div className="form-group">
                    <label className="label-text"> Email Address* : </label>
                    <input name="Email" className="form-control" placeHolder="Enter Email Address" required={true}
                      value={this.state.Email} onChange={this.changeemailHandler} />
                  </div>
                  <div className="form-group">
                    <label className="label-text"> Mobile No.* : </label>
                    <input name="MobileNo" className="form-control" placeHolder="Enter Mobile Number" required={true}
                      value={this.state.MobileNo} onChange={this.changemobilenoHandler} pattern={"[7-9]{1}[0-9]{9}"} 
                      title="Phone number should contain 10 digits"/>
                  </div>
                  <div className="form-group">
                    <label className="label-text"> Aadhar Card No.* : </label>
                    <input name="AadharCardNo" className="form-control" placeHolder="Enter Aadhar Card Number" required={true}
                      value={this.state.AadharCardNo} onChange={this.changeaadharcardnoHandler} pattern={"/\\d{16}"} 
                      title="Aadhar Card should contain 16 digits"/>
                  </div>
                  <center>
                  <button className="btn btn-warning btn-lg mt-4" onClick={this.addguesthandler}>
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Create</button></center>
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