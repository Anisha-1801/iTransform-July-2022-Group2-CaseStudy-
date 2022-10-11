import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';
import "./AddStaff.css";
// import { Alert } from 'react-bootstrap';

class StaffAddForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      StaffId: '',
      departments:[],
      DepartmentId: '',
      FirstName: '',
      LastName: '',
      Gender: '',
      Dob: '',
      Doj: '',
      Address: '',
      Salary: '',
      MobileNumber: '',
      Email: '',  
    }
    this.changedepartmentidHandler = this.changedepartmentidHandler.bind(this);
    this.changefirstnameHandler = this.changefirstnameHandler.bind(this);
    this.changelastnameHandler = this.changelastnameHandler.bind(this);
    this.changegenderHandler = this.changegenderHandler.bind(this);
    this.changedobHandler = this.changedobHandler.bind(this);
    this.changedojHandler = this.changedojHandler.bind(this);
    this.changeaddressHandler = this.changeaddressHandler.bind(this);
    this.changesalaryHandler = this.changesalaryHandler.bind(this);
    this.changemobilenumberHandler = this.changemobilenumberHandler.bind(this);
    this.changeemailHandler = this.changeemailHandler.bind(this);

    this.addstaffthandler = this.addstaffhandler.bind(this);

  }
 
  changedepartmentidHandler = (e) => {
    this.setState({ DepartmentId: e.target.value })
  }
  changefirstnameHandler = (e) => {
    this.setState({ FirstName: e.target.value })
  }
  changelastnameHandler = (e) => {
    this.setState({ LastName: e.target.value })
  }
  changegenderHandler = (e) => {
    this.setState({ Gender: e.target.value })
  }
  changedobHandler = (e) => {
    this.setState({ Dob: e.target.value })
  }
  changedojHandler = (e) => {
    this.setState({ Doj: e.target.value })
  }
  changeaddressHandler = (e) => {
    this.setState({ Address: e.target.value })
  }
  changesalaryHandler = (e) => {
    this.setState({ Salary: e.target.value })
  }
  changemobilenumberHandler = (e) => {
    this.setState({ MobileNumber: e.target.value })
  }
  changeemailHandler = (e) => {
    this.setState({ Email: e.target.value })
  }


  addstaffhandler = (e) => {
    let Staff = { DepartmentId: this.state.DepartmentId, FirstName: this.state.FirstName, 
        LastName: this.state.LastName, Gender: this.state.Gender,Dob: this.state.Dob,Doj: this.state.Doj,
        Address: this.state.Address,Salary: this.state.Salary,MobileNumber: this.state.MobileNumber,Email: this.state.Email }
    console.log(Staff)
    axios.post(Variables.api + 'Staffs', Staff,{ headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => { alert(res) })
      .catch(err => alert(err))
  }

  componentDidMount() {
    axios.get(Variables.api + 'Departments', { headers: { "Authorization": `Bearer ${Variables.token}` } })
        .then(response => response.data)
        // .then(res=>console.log(res))
        .then(res => {
            this.setState({
                departments: res
            })
        })
        .catch(error => console.log(error))
  }

  // On Change Event Handlers


  //Date functionality
  disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    // console.log(today)
    dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    mm = today.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm
    }
    yyyy = today.getUTCFullYear();
    return yyyy + "-" + mm + "-" + dd;
}


  render() {
    return (
      <div className='Staff-form-body'>
        <div className='container'>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3" id='card-bg'>
              {
                <h3 className='label-heading'>Add Staff</h3>
              }
              <div className="card-body">
                <form action = "/Staff">
                  <div className="form-group">
                    <div className='row'>
                      <div className='col'>
                        <label className="label-text">First Name: </label>
                        <input placeholder="Enter First Name" name="fname" className="form-control" onChange={this.changefirstnameHandler} />
                      </div>
                      <div className="col">           
                          <label className="label-text">Last name: </label>
                          <input placeholder="Enter Last Name" name="lname" className="form-control" onChange={this.changelastnameHandler}/>
                      </div>
                    </div>
                </div>
            
                    <div className='row'>
                    <div className='col'>
                    <div className='form-group mt-2'>
                    <label className="label-text" for="gender">Gender:</label>
                        <select name="gender" id="gender" className="form-control"
                        value={this.state.Gender} onChange={this.changegenderHandler}>
                            <option value="type">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>
                    <div className='col'>
                        <div className="form-group mt-2">
                        <label className="label-text"> Salary: </label>
                        <input placeholder="Enter Salary" name="salary" className="form-control"
                        value={this.state.Salary} onChange={this.changesalaryHandler} />
                        </div>
                    </div>
                </div>
                  
                  <div className="form-group mt-2">
                    <div className='row'>
                       <div className='col'>
                            <label className="label-text"> Date Of Birth: </label>
                            <input type="date"  name="dob" className="form-control mb-3"
                            value={this.state.Dob} onChange={this.changedobHandler} max={this.disableDates()}/>
                        </div>
                        <div className='col'>
                            <label className="label-text"> Date of Joining: </label>
                            <input type="date" name="doj" className="form-control"
                            value={this.state.Doj} onChange={this.changedojHandler} min={this.disableDates()} />
                        </div>
                    </div>     
                </div> 
                <div className="form-group" style={{marginTop:"0"}}>
                    <label className="label-text"> Address: </label>
                    <input type="text" placeholder="Enter your Address" name="Address" className="form-control"
                      value={this.state.Address} onChange={this.changeaddressHandler} />
                </div>
                 
                 <div className ="row">
                    <div className='col'>
                        <div className="form-group mt-2">
                            <label className="label-text"> Mobile Number: </label>
                            <input placeholder="Enter Mobile No." name="Number" className="form-control"
                            value={this.state.MobileNumber} onChange={this.changemobilenumberHandler} />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="form-group mt-2">
                            <label className="label-text"> Email Id: </label>
                            <input placeholder="Enter your Email" name="email" className="form-control"
                            value={this.state.Email} onChange={this.changeemailHandler} />
                        </div>
                    </div>
                 </div>
                  
                  {/* <br></br> */}
                  
                  <div class="form-group">
                        <label className="form-label mt-2">Department Name:</label>
                           
                            <select className="form-select" value={this.state.DepartmentId} onChange={this.changedepartmentidHandler} >
                                  <option value="type">Select Department Name</option>   
                                        {this.state.departments.map(rp =>
                                  <option key={rp.DepartmentId} value={rp.DepartmentId}>{rp.DepartmentName}</option>
                                
                                )}
                            </select>
                  </div>
                  <center>               
                     <button className="btn btn-warning btn-lg mt-4" onClick={this.addstaffhandler}>
                     <i class="fa fa-check" aria-hidden="true"></i> &nbsp;Create</button>
                  </center> 
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default StaffAddForm