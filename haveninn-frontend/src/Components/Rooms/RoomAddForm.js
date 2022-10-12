import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';

class RoomAddForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            RoomId: '',
            RoomTypeId: '',
            isAvailable: '',
            Description: '',
            roomTypes: []

        }
        this.changeroomidHandler = this.changeroomidHandler.bind(this);
        this.changeroomtypeidHandler = this.changeroomtypeidHandler.bind(this);
        this.changeisavailableHandler = this.changeisavailableHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.addroomhandler = this.addroomhandler.bind(this);
    }

    componentDidMount() {
        axios.get(Variables.api + 'RoomTypes', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            // .then(res=>console.log(res))
            .then(res => {
                this.setState({
                    roomTypes: res
                })
            })
            .catch(error => console.log(error))
    }

    changeroomidHandler = (e) => {
        this.setState({ RoomId: e.target.value })
    }

    changeroomtypeidHandler = e => {
        this.setState({ RoomTypeId: e.target.value })
    }

    changeisavailableHandler = (e) => {
        this.setState({ isAvailable: e.target.value })
    }
    changedescriptionHandler = (e) => {
        this.setState({ Description: e.target.value })
    }

    addroomhandler = (e) => {
        let Room = { RoomId: this.state.RoomId, RoomTypeId: this.state.RoomTypeId, isAvailable: this.state.isAvailable, Description: this.state.Description }
        console.log(Room)
        axios.post(Variables.api + 'Rooms', Room, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(res => { alert("Room Added Successfully!") })
            .catch(alert("Oops! Something went wrong."))
    }

    render() {
        return (
            <>
            {Variables.isUserLoggedin ? 
            <div className="r-container">
                <div className="d-container container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <center>
                                <h3 className='label-heading'>Add Rooms</h3>
                            </center>
                            <div className="card-body">
                                <form action="/Room">
                                    <div className="form-group">
                                        <label className="label-text"> Room Number </label>
                                        <input placeholder="Number" name="RoomId" className="form-control" required={true}
                                            value={this.state.RoomId} onChange={this.changeroomidHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label className="label-text"> Room Type: </label>
                                        <select className="form-select" value={this.state.RoomTypeId} required={true} onChange={this.changeroomtypeidHandler} >

                                            {this.state.roomTypes.map(rp =>
                                                <option key={rp.RoomTypeId} value={rp.RoomTypeId}>{rp.RoomTypeName}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="label-text"> Status: </label>
                                        <input placeholder="status" name="status" className="form-control" required={true}
                                            value={this.state.isAvailable} onChange={this.changeisavailableHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label className="label-text"> Description: </label>
                                        <input placeholder="description" name="Description" className="form-control" required={true}
                                            value={this.state.Description} onChange={this.changedescriptionHandler} />
                                    </div>
                                    <center className="mt-2">
                                        <button className="btn btn-warning btn-lg" onClick={this.addroomhandler}>
                                            <i class="fa fa-check" aria-hidden="true"></i>&nbsp;Create</button>
                                    </center>
                                </form>
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

export default RoomAddForm