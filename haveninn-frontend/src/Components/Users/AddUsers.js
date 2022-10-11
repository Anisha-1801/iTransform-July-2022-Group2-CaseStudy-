import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';

class AddUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Password: '',
      Role: '',
      Staffs:[],
      StaffId:'',
      Email: ''

    }
    this.changepasswordHandler = this.changepasswordHandler.bind(this);
    this.changeroleHandler = this.changeroleHandler.bind(this);
    this.changestaffidHandler = this.changestaffidHandler.bind(this);
    this.changeemailHandler = this.changeemailHandler.bind(this);
    this.adduserhandler = this.adduserhandler.bind(this);

    }
     componentDidMount() {
    axios
      .get(Variables.api + "Staffs", {
        headers: { Authorization: `Bearer ${Variables.token}` },
      })
      .then((response) => response.data)
      .then((res) => {
        this.setState({
          Staffs: res,
        });
      })
      .catch((error) => console.log(error));
      
  }
 
  changepasswordHandler = (e) => {
    this.setState({ Password: e.target.value })
  }
  changeroleHandler = (e) => {
    this.setState({ Role: e.target.value })
  }
    changestaffidHandler = (e) => {
    this.setState({ StaffId: e.target.value })
    }
    
  changeemailHandler = (e) => {
    this.setState({ Email: e.target.value })
  }
  adduserhandler = (e) => {
    let User = { Password: this.state.Password, Role: this.state.Role, StaffId: this.state.StaffId, Email: this.state.Email }
    console.log(User)
    axios.post(Variables.api + 'Users', User,{ headers: { "Authorization": `Bearer ${Variables.token}` } })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    axios.post(Variables.api + `EmailSender/UserEmail?staffid=${User.StaffId}`).then(res=>console.log(res)).catch(err=>console.log(err))
   
    
  }
    render() {
      return (
        
      <div className='r-container'>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="rf-card card col-md-6 p-3 offset-md-3 ">
                {
                  <center>
                    <h3 className='label-heading'>Add User</h3>
                    </center>
              }
              <div className="card-body mb-3">
                <form >
                  <div className="form-group">
                    <label className='form-label'>Password :</label>
                    <input placeholder="Enter Password" name="Password" className="form-control mb-3" required={true} type="text"
                      defaultValue={this.state.Password} onChange={this.changepasswordHandler} />
                  </div>
                  <div className="form-group">
                  <label className='form-label'>Role :</label>
                    <select className="form-select mb-3" value={this.state.Role} onChange={this.changeroleHandler}>
                    <option selected>Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Receptionist">Receptionist</option>
                    </select>
                  </div>
                  <div className="form-group">
                  <label className='form-label'>Staff :</label>
                    <select className="form-select mb-3"  value={this.state.StaffId} onChange={this.changestaffidHandler}>
                        <option value="null" >Select StaffId</option>
                        {this.state.Staffs.map(s=>
                        <option size="4" key={s.StaffId} value={s.StaffId}>{s.StaffId}</option>
                        )}
                    </select>
                  </div>
                   <div className="form-group">
                   <label className='form-label'>Email :</label>
                    <select className="form-select mb-3" value={this.state.Email} onChange={this.changeemailHandler}>
                        <option value="null">Select Email</option>
                        {(this.state.Staffs.filter(s=>s.StaffId==this.state.StaffId)).map(s=>
                        <option  key={s.StaffId} value={s.Email}>{s.Email}</option>
                        )}
                    </select>
                    </div>
                    <center>
                    <button className="btn btn-warning mt-2 btn-lg" onClick={this.adduserhandler} >
                    <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Create</button>
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

export default AddUsers