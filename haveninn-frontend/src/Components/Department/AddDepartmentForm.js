import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';
import Dashboard from '../Dashboard/Dashboard'
import './Department.css'

// import { Alert } from 'react-bootstrap';

class AddDepartmentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      DepartmentId: '',
      DepartmentName: ''
    }
    this.changedepartmentnameHandler = this.changedepartmentnameHandler.bind(this);
  }
 
  changedepartmentnameHandler = (e) => {
    this.setState({ DepartmentName: e.target.value })
  }
  
  addDepartmenthandler = (e) => {
    let Department = { DepartmentName: this.state.DepartmentName}
    console.log(Department)
    axios.post(Variables.api + 'Departments', Department , { headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => { alert(res) })
      .catch(err => alert(err))
  }

  render() {
    return (
      <>
      <div  className="d-container">
        <div className="d-container container">
        <div className='row'>
        <div className="col-md-6 mx-auto">
          <div className='mt-3 p-3'>
             <h3 className='form-card-title'>Add Department</h3>
              <div className=" mt-4">
                <form>
                  <div className="form-group">
                    <label className="form-label">Department Name :</label>
                    <input placeholder="Enter Department Name" name="Department Name" className="form-control" required={true}
                      value={this.state.Name} onChange={this.changedepartmentnameHandler} />
                  </div>
                  <center><button className="btn btn-warning mt-3" onClick={this.addDepartmenthandler}>
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Create</button></center>
                </form>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        </>
    )
  }
}

export default AddDepartmentForm 