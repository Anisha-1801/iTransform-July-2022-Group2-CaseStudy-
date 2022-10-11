import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Variables from '../../Variables/Variables';
import { useNavigate } from 'react-router-dom';


function RoomType() {
    const [roomtype, setRoomtype] = useState([])
    const navigate = useNavigate();


    const getRoomId = id => {
        navigate('/RoomType/Update', { state: { Id: id } });
    }



    useEffect(() => {
        axios.get(Variables.api + 'RoomTypes', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => setRoomtype(res))
            .catch(error => console.log(error))
    }, [])


    return (
        <div className='r-container'>
            <div className="container r-container mt-4 mb-4">
                <div className="d-flex justify-content-center">
                    <h1 className='label-heading'>Room Type
                        <a className='add-roomtype text-warning' href="/RoomType/Add">
                            &nbsp;&nbsp;
                            <i className="fa fa-plus-circle"></i></a>
                    </h1>
                </div>
                <div className="container mt-4 mb-4">
                    <div className="row">
                        {roomtype.map((roomt) => (
                            <div className="col-sm-4" key={roomt.RoomTypeId}>
                                <article className="card mb-3 room-card p-3">
                                    <div className="row no-gutters">
                                        <div className="col-md-10">
                                            <div className="ms-2">
                                                <h5><p className='para-head'><b>Type : </b> {roomt.RoomTypeName}</p></h5>
                                                {/* <p><b>Room Type ID:</b> {roomt.RoomTypeId}</p> */}
                                                <p className='para-text'><b>Price : </b>₹ {roomt.Price}</p>
                                            </div>
                                        </div>
                                        <aside className="col-md-2">
                                            <div>
                                                <div className="d-grid gap-3 d-md-flex justify-content-md-left">
                                                    <a href="/RoomType/Update" className='mb-2' onClick={() => getRoomId(roomt.RoomTypeId)}>
                                                        <i className="fa fa-edit text-warning fs-5"></i>
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
            </div>
        </div>

    )
}

export default RoomType