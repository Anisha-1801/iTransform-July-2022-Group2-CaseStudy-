import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import { useLocation} from 'react-router-dom';

function GuestUpdateForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [aadharCardNo, setAadharCardNo] = useState('')
   
    
    const location = useLocation()
    const guestId = location.state.Id

    useEffect(() => {
        axios.get(Variables.api + `Guests/Search/${guestId}`, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res =>{ setName(res.Name)
             setEmail(res.Email)
             setMobileNo(res.MobileNo)
           setAadharCardNo(res.AadharCardNo)})
            .catch(error => console.log(error))
    }, [])

    const updateGuesthandler = () => {
        

        axios.put(Variables.api + `Guests/${guestId}`, 
             { GuestId: guestId,
               Name:  name,
               Email: email,
               MobileNo: mobileNo ,
               AadharCardNo: aadharCardNo},
         { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .catch(error => alert(error))
            alert('donee')
    }

    return (
        <div>
            <div className="d-container">
                <div className="d-container container">
                    <div className='row'>
                        <div className="col-md-6 mx-auto">
                            <div className='mt-3 p-3'>
                                <h3 className='form-card-title'>Update Guest</h3>
                                <div className=" mt-4">
                                    <form action="/guestf" onSubmit={() => { updateGuesthandler() }} >
                                        <div className="form-group">

                                            <label className="form-label">Name : </label>
                                            <input type="text" placeholder="" className="form-control"
                                                defaultValue={name} onChange={e => setName(e.target.value)} />

                                            <label className="form-label">Email : </label>
                                            <input type="text" placeholder="" className="form-control"
                                                defaultValue={email} onChange={e => setEmail(e.target.value)} />

                                            <label className="form-label">MobileNo :</label>
                                            <input type="text" placeholder="" className="form-control"
                                                defaultValue={mobileNo} onChange={e => setMobileNo(e.target.value)} />

                                            <label className="form-label">AadharCardNo :</label>
                                            <input type="text" placeholder="" className="form-control"
                                                defaultValue={aadharCardNo} onChange={e => setAadharCardNo(e.target.value)} />
                                        </div>
                                        <center><button className="btn btn-warning mt-3" type="submit">Update</button></center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default GuestUpdateForm