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
    <div>
      <>
      <div className="container mt-5 mb-5">
        <div className="row">
            {Departments.map(department => (
          <div className="col-md-4" key={department.DepartmentId}>
            <article className="card mb-3 room-card p-3">
              <div className="row no-gutters">
                <div className="col-md-8">
                    <div className="m-1">                            
                      <h5>Department Id: {department.DepartmentId}</h5>
                      <p><b>Department:</b> {department.DepartmentName}</p>                           
                    </div>
                </div>
              
              <aside className="col-md-4">
                <div>
                  <div className="d-grid gap-3 d-md-flex justify-content-md-right ms-1 mt-4 fs-5">        
                      <a href="/Department/Update" onClick={()=>getDepartmentId(department.DepartmentId) }>
                        <i className="far fa-edit text-dark"></i>
                      </a>                    
                      <a href="/Department">
                        <i className='fa fa-trash text-dark'></i>
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
  )
}

export default Department
