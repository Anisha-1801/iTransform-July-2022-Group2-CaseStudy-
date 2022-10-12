import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';

class RoomTypeAddForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            RoomTypeId: '',
            RoomTypeName: '',
            Price: ''
        }



        this.changeroomtypenameHandler = this.changeroomtypenameHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.addroomtypehandler = this.addroomtypehandler.bind(this);
    }


    changeroomtypenameHandler = e => {
        this.setState({ RoomTypeName: e.target.value })
    }

    changepriceHandler = (e) => {
        this.setState({ Price: e.target.value })
    }

    addroomtypehandler = (e) => {
        let Roomtype = { RoomTypeName: this.state.RoomTypeName, Price: this.state.Price }
        console.log(Roomtype)
        axios.post(Variables.api + 'RoomTypes', Roomtype, { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(res => { alert(res) })
            .catch(err => alert(err))
    }

    render() {
        return (
            <>
        {Variables.isUserLoggedin ?
            <div className="r-container">
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <center>
                                <h3 className='label-heading'>Add Room Type</h3>
                            </center>
                            <div className="card-body">
                                <form action="/RoomType">
                                    <div className="form-group">
                                        <label className="label-text">Room Type : </label>
                                        <input placeholder="Enter Room Type" name="RoomTypeName" className="form-control" required={true}
                                            value={this.state.RoomTypeName} onChange={this.changeroomtypenameHandler} />
                                    </div>



                                    <div className="form-group">
                                        <label className="label-text"> Price : </label>
                                        <input placeholder="Enter Price" name="price" className="form-control" required={true}
                                            value={this.state.Price} onChange={this.changepriceHandler} />
                                    </div>

                                    <center className="mt-3">
                                        <button className="btn btn-warning btn-lg" onClick={this.addroomtypehandler}>
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

export default RoomTypeAddForm