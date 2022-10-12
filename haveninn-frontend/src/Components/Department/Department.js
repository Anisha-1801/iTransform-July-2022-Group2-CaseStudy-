import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import {useNavigate} from 'react-router-dom';

function Department() {

    const [Departments,setDepartment] = useState([])
    const navigate = useNavigate();

    const getDepartmentId = id => {
      navigate('/Department/Update',{state:{Id:id}});
    }

    useEffect(() => {
        axios.get(Variables.api + 'Departments', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => setDepartment(res))
        .catch(error => console.log(error))
    }, [])

  return (
    <>
    {Variables.isUserLoggedin ? 
    <div className="d-container">
      <>
      <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center">
        <h1 className='label-heading'>Department
        <a className='add-guest text-warning' href="/Department/Add">
          &nbsp;&nbsp;
        <i className="fa fa-plus-circle"></i></a>
        </h1>
      </div>
        <div className="row">
            {Departments.map(department => (
          <div className="col-lg-4 col-md-6" key={department.DepartmentId}>
            <article className="card mb-3 room-card p-3">
              <div className="row no-gutters">
                <div className="col-9">
                    <div className="m-1">                            
                      <h4 className='para-head'>Department Id: {department.DepartmentId}</h4>
                      <p className='d-para-text'><b>Department:</b> {department.DepartmentName}</p>                           
                    </div>
                </div>
              <aside className="col-2">
                <div>
                  <div className="d-grid gap-3 d-md-flex justify-content-md-right mt-1 fs-5">        
                      <a href="/Department/Update" onClick={()=>getDepartmentId(department.DepartmentId) }>
                        <i className="far fa-edit text-warning"></i>
                      </a>                    
                      <a href="/Department">
                        <i className='fa fa-trash text-danger'></i>
                      </a>        
                  </div>
                </div>
              </aside>
            </div>
            </article> 
          </div>
          ))}
          </div>
      </div>
    </>
    </div>
    :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
    </>
  )
}

export default Department
