import React,{ Component} from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
// import {useLocation} from 'react-router-dom'

class Password extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        Users:[],
        Password:''
     }
     this.updatepassword=this.updatepassword.bind(this);
   }
   componentDidMount(){
    axios.get(Variables.api + 'Users', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
    .then(response => response.data)
    .then(res => this.setState({Users:res}))
    .catch(error => console.log(error))
   }
   
    updatepassword(){
        const User=this.state.Users.filter(u=>u.Email==Variables.email)
        const u=User.map(u=>u.UserId)
        const r=User.map(u=>u.Role)
        const s=User.map(u=>u.StaffId)

        axios.put(Variables.api + `Users/${u[0]}`, {UserId:u[0],Password:this.state.Password,Role:r[0],StaffId:s[0],Email:Variables.email} , { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(alert('successfully changed your password'))
        .catch(error => alert("Password Changed Successfully"))
        sessionStorage.clear()
        window.location.reload()

        // alert('successfully changed your password')
    }
render(){
    const User=this.state.Users.filter(u=>u.Email==Variables.email)
    const u=User.map(u=>u.UserId)
    const P=User.map(u=>u.Password)
    const r=User.map(u=>u.Role)
    const s=User.map(u=>u.StaffId)
  return (
    <>
    {Variables.isUserLoggedin ? 
    <div>
        <div  className="d-container">
        <div className="d-container container">
        <div className='row'>
        <div className="col-md-6 mx-auto">
          <div className='mt-3 p-3'>
             <h3 className='form-card-title'>Change Password</h3>
              <div className=" mt-4">
                <form  action="/"onSubmit={this.updatepassword}>
                  <div className="form-group">
                    <label className="form-label">UserId</label>
                    <input type="text"  className="form-control"
                      defaultValue={u[0]} disabled={true} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="text"  className="form-control"
                      defaultValue={P[0]} onChange={e=>this.setState({Password:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <input type="text"  className="form-control"
                      defaultValue={r[0]} disabled={true} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">StaffId</label>
                    <input type="text"  className="form-control"
                      defaultValue={s[0]} disabled={true} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control"
                      defaultValue={Variables.email} disabled={true} />
                  </div>
                  <center><button className="btn btn-warning mt-3" type="submit">
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Create</button></center>
                </form>
              </div>
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

export default Password