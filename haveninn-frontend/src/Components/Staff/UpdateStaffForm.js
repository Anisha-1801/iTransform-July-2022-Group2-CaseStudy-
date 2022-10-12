import React,{useState, useEffect} from 'react'
import Variables from '../../Variables/Variables';
import {useLocation} from 'react-router-dom'
import axios from 'axios';

function UpdateStaffForm() {
    
    const [DeptId , setDeptId] = useState('')
    const [Firstname , setFName] =  useState('')
    const [Lastname, setLname] = useState('')
    const [gender , setGender] = useState('')
    const [dob , setDob] = useState('')
    const [doj , setDoj] = useState('')
    const [address,setAddress] = useState('')
    const [salary , setSalary] = useState('')
    const [mobile , setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [DeptName , setDeptName] = useState('')
    const [department, setDepartment] = useState([]);

    const location = useLocation()
    const staffid =  location.state.Id
 
    useEffect(() => {
        axios.get(Variables.api+`Staffs/${staffid}`, { headers: {"Authorization" : `Bearer ${Variables.token}`} })
        .then(response => response.data)
        .then(res => {
            setDeptId(res.DepartmentId)
            setFName(res.FirstName)
            setLname(res.LastName)
            setGender(res.Gender)
            setDob(setCorrectFormat(res.Dob))
            setDoj(setCorrectFormat(res.Doj))
            setAddress(res.Address)
            setSalary(res.Salary)
            setMobile(res.MobileNumber)
            setEmail(res.Email)
            setDeptName(res.Department.DepartmentName)
        })
        fetchDepartments();
    }, [])

    function fetchDepartments(){
      axios.get(Variables.api + 'Departments', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
      .then(response => response.data)
      .then(res => { setDepartment(res)})
      .catch( error => console.log(error))
    }

    function setCorrectFormat(date){
      var now = new Date(date);
      var month = (now.getMonth() + 1);               
      var day = now.getDate();
      if (month < 10) 
          month = "0" + month;
      if (day < 10) 
          day = "0" + day;
      var today = now.getFullYear() + '-' + month + '-' + day;
      return today
    }

    const updateStaffhandler = () => {
      axios.put(Variables.api+ `Staffs/${staffid}`, {
        StaffId : staffid , 
        DepartmentId : DeptId,
        FirstName : Firstname,
        LastName: Lastname,
        Gender : gender,
        Dob : dob,
        Doj : doj,
        Address : address,
        Salary : salary,
        MobileNumber : mobile,
        Email : email
      },{ headers: {"Authorization" : `Bearer ${Variables.token}`} })
      .then(res => alert("Updated Successfully"))
      .catch(err => alert("Something went wrong, Try again later!") )


    } 

    return (
      <div  className="d-container">
      <div className="d-container container">
      <div className='row'>
      <div className="col-md-6 mx-auto">
        <div className=' p-3'>
           <h3 className='label-heading'>Update Staff</h3>
            <div>
              <form  action = "/Staff" onSubmit={() => {updateStaffhandler()}}>
                  <div className="form-group">
                    <div className = "form-group">
                      <label className="label-text">Department Name</label>
                      <select className="form-select" onChange={e => setDeptId(e.target.value)}>
                        <option value={DeptId}> {DeptName}</option>
                            {department.map(d=>
                        <option key={d.DepartmentId} value={d.DepartmentId}>{d.DepartmentName}</option>
                         )}
                    </select>
                    </div>
                    <div className ="form-group">
                      <div className = "row">
                        <div className = "col">
                            <label className="label-text">First Name</label>
                            <input type="text" className="form-control" defaultValue={Firstname}  onChange={e => setFName(e.target.value)}/>
                        </div>
                        <div className = "col">
                            <label className="label-text">Last Name</label>
                            <input type="text" className="form-control"  defaultValue={Lastname} onChange={e => setLname(e.target.value)}/>
                        </div>
                      </div>
                      <div className ="form-group">
                          <label className="label-text">Gender</label>
                          <input type="text" className="form-control" defaultValue={gender} onChange={e => setGender(e.target.value)}/>
                      </div>
                      <div className ="form-group">
                        <div className = "row">
                          <div className='col'>
                              <label className="label-text">Date of Birth</label>
                              <input type="date" className="form-control" defaultValue={dob} onChange={e => setDob(e.target.value)}/>
                          </div>
                          <div className = "col">
                              <label className="label-text">Date of Joining</label>
                              <input type="date" className="form-control" defaultValue={doj} onChange={e => setDoj(e.target.value)}/>
                          </div>
                      </div>
                      <div className ="form-group">
                          <label className="label-text">Address</label>
                          <input type="text" className="form-control" defaultValue={address} onChange={e => setAddress(e.target.value)}/>
                      </div>
                      <div className ="form-group">
                          <label className="label-text">Salary</label>
                          <input type="text" className="form-control" defaultValue={salary} onChange={e => setSalary(e.target.value)}/>
                      </div>
                      <div className ="form-group">
                          <label className="label-text">Mobile Number</label>
                          <input type="text" className ="form-control" defaultValue={mobile} onChange={e => setMobile(e.target.value)}/>
                      </div>
                      <div className ="form-group">
                          <label className="label-text">Email</label>
                          <input type="text" className ="form-control" defaultValue={email} onChange={e => setEmail(e.target.value)}/>
                      </div>
                    </div>
                    </div>
                    <center>
                          <button type="submit" className ="btn btn-warning mt-3 btn-lg" >
                          <i class="fa fa-check" aria-hidden="true"></i> &nbsp;Update</button>
                    </center>
                    
                  </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    )
  
}

export default UpdateStaffForm