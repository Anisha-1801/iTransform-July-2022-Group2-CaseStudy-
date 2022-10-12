import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Variables from '../../Variables/Variables';
import { useLocation } from 'react-router-dom'
// import './Room.css'

function RoomUpdateForm() {
    const location = useLocation();
    const Rid = location.state.Id;

    const [RoomType, setRoomType] = useState([])
    const [roomtypeId, setRoomtypeId] = useState('')
    const [isavailable, setIsavailable] = useState('')
    const [description, setDescription] = useState('')
    const [roomtypename, setRoomtypename] = useState('')

    function fetchRoomTypes() {
        axios.get(Variables.api + 'RoomTypes', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => { setRoomType(res) })
            .catch(error => console.log(error))

        console.log(RoomType)
    }



    useEffect(() => {
        axios.get(Variables.api + `Rooms/${Rid}`, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => {
                setRoomtypeId(res.RoomTypeId);
                setIsavailable(res.IsAvailable);
                setDescription(res.Description);
                setRoomtypename(res.RoomType.RoomTypeName);
            })
            .catch(error => alert(error))

        fetchRoomTypes();
    }, [])


    const UpdateRoom = () => {

        axios.put(Variables.api + `Rooms/${Rid}`, {
            RoomId: Rid,
            RoomTypeId: roomtypeId,
            IsAvailable: isavailable,
            Description: description
        },
            { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(res => console.log(res))
            .catch(error => alert(error))
    }


    return (
        <>
        {Variables.isUserLoggedin ? 
        <div>
            <div className="r-container">
                <div className="d-container container">
                    <div className='row'>
                        <div className="col-md-6 mx-auto">
                            <div className='mt-3 p-3'>
                                <h3 className='form-card-title label-text'>Update Room</h3>
                                <div className=" mt-4">
                                    <form action="/Room" onSubmit={() => {UpdateRoom()}} >
                                        <div className="form-group">
                                            <label className="label-text">Room Id : </label>
                                            <input type="text" className="form-control" disabled={true} defaultValue={Rid} />

                                            <label className="form-label label-text">Room Type:</label>
                                            <select className="form-select" onChange={e => setRoomtypeId(e.target.value)}>
                                                <option value={roomtypeId}> {roomtypename}</option>
                                                {RoomType.map(r =>
                                                    <option key={r.RoomTypeId} value={r.RoomTypeId}>{r.RoomTypeName}</option>
                                                )}
                                            </select>

                                            <label className="form-label label-text">Status:</label>
                                            <input type="text"  className="form-control" required={true}
                                                defaultValue={isavailable} onChange={e => setIsavailable(e.target.value)} />

                                            <label className="form-label label-text">Description:</label>
                                            <input type="text"  className="form-control" required={true}
                                                defaultValue={description} onChange={e => setDescription(e.target.value)} />
                                        </div>
                                        <center><button className="btn btn-warning btn-lg mt-3" type="submit">
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

export default RoomUpdateForm