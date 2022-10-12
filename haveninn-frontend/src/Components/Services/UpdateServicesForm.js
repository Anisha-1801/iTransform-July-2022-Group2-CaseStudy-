import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import {useLocation} from 'react-router-dom'
import "./Services.css"

function UpdateServicesForm() {
    const [sName , setsName]=useState('')
    const [sPrice , setsPrice]=useState('')
    // const [Services,setServices]=useState([])

    const location = useLocation()
    const sId = location.state.Id

    useEffect(() => {
        axios.get(Variables.api + `Services/${sId}`, { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => {setsName(res.ServiceName)
                      setsPrice(res.Price)})

        .catch(error => console.log(error))
    },[])
    const updateServicehandler = () => {
        axios.put(Variables.api + `Services/${sId}`, {ServiceId : location.state.Id, ServiceName : sName , Price :sPrice } , { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        //.then(res => setServices(res))
        .catch(error => alert("Something went wrong, Try Again later!"))
        
    }


  return (
    <>
        {Variables.isUserLoggedin ? 
    <div>
        <div className='r-container'>
       <div  className="d-container">
        <div className="d-container container">
        <div className='row'>
        <div className="col-md-6 mx-auto">
          <div className='mt-3 p-3'>
             <h3 className='form-card-title'>Update Services</h3>
              <div className=" mt-4">
                <form action="/Services" onSubmit={()=>{updateServicehandler()}}>
                  <div className="form-group">
                    <label className="form-label"> Name :</label>
                    <input type="text" placeholder="Enter Service Name" className="form-control" required={true}
                      defaultValue={sName} onChange={e => setsName(e.target.value)} />
                      <label className="form-label"> Price :</label>
                    <input type="text" placeholder="Enter Service Price" className="form-control" required={true}
                      defaultValue={sPrice} onChange={e => setsPrice(e.target.value)} />
                  
                  </div>

                  <center><button className="btn btn-warning mt-3" type="submit">
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp;Update</button></center>
                </form>
              </div>
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

export default UpdateServicesForm