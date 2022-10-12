import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import {useLocation} from 'react-router-dom'

function UpdateDepartmentForm() {
    const [DeptName, setDeptName] = useState('')
    const [Departments, setDepartments] = useState([])

    const location = useLocation()
    const deptid = location.state.Id

      useEffect(() => {
        axios.get(Variables.api + `Departments/${deptid}`, { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => setDepartments(res))
        .catch(error => console.log(error))
    })

    const updateDepartmenthandler = () => {
        axios.put(Variables.api + `Departments/${deptid}`, {DepartmentId : location.state.Id, DepartmentName : DeptName} , { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => console.log(res))
        .catch(error => alert(error))
    }

  return (
    <>
    {Variables.isUserLoggedin ? 
    <div>
        <div  className="d-container">
        <div className="d-container container">
        <div className='row'>
        <div className="col-md-6 mx-auto">
          <div className='mt-3 p-3'>
             <h3 className='form-card-title'>Update Department</h3>
              <div className=" mt-4">
                <form action="/Department" onSubmit={()=>{updateDepartmenthandler()}}>
                  <div className="form-group">
                    <label className="form-label">Department Name :</label>
                    <input type="text" placeholder="Enter Department Name" className="form-control" required={true}
                      defaultValue={Departments.DepartmentName} onChange={e => setDeptName(e.target.value)} />
                  </div>
                  <center><button className="btn btn-warning mt-3" type="submit">
                  <i class="fa fa-check" aria-hidden="true"></i>&nbsp; Update</button></center>
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

export default UpdateDepartmentForm