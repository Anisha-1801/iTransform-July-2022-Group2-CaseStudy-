import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables'
import { useLocation } from 'react-router-dom'

function RoomTypeUpdateForm() {
    const location = useLocation()
    const roomtypeid = location.state.Id

    const [RTName, setRoomTypeName] = useState('')
    const [price, setPrice] = useState('')

   
    useEffect(() => {
        axios.get(Variables.api + `RoomTypes/${roomtypeid}`, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => {setRoomTypeName(res.RoomTypeName)
            setPrice(res.Price)})
            .catch(error => console.log(error))
    },[])

    const updateRoomTypeHandler = () => {
        axios.put(Variables.api + `RoomTypes/${roomtypeid}`,
         { RoomTypeId: roomtypeid, 
            RoomTypeName: RTName,
             Price: price },
         { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(console.log("Updated Successfully!"))
            .catch(error => alert("Oops! Something went wrong."))
    }

    return (
        <>
        {Variables.isUserLoggedin ? 
        <div>
            <div className='r-container '>
                <div className="container">
                    <div className='row'>
                        <div className="col-md-6 mx-auto">
                            <div className='mt-3 p-3'>
                                <center><h3 className='form-card-title label-heading'>Update Room Type</h3></center>
                                <div className=" mt-4">
                                    <form action="/RoomType"  onSubmit={() => { updateRoomTypeHandler() }} >
                                        <div className="form-group">
                                            <label className="form-label label-text">Room Type : </label>
                                            <input type="text" placeholder="" className="form-control" required={true}
                                                defaultValue={RTName} onChange={e => setRoomTypeName(e.target.value)} />

                                            <label className="form-label label-text">Price : </label>
                                            <input type="text" placeholder="" className="form-control" required={true}
                                                defaultValue={price} onChange={e => setPrice(e.target.value)} />
                                        </div>
                                        <center><button className="btn btn-warning mt-3 btn-lg" type="submit">
                                        <i class="fa fa-check" aria-hidden="true"></i> &nbsp;Update</button></center>
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

export default RoomTypeUpdateForm