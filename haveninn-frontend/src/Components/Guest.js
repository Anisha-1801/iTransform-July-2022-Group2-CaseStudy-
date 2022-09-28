import React, { Component } from 'react'
import { Variables } from './Variables.js'

 class Guest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Guests: [],
            modaltitle: "",
            Name: "",
            Email: "",
            MobileNo: "",
            AadharCardNo: "",
            GuestId: 0
        }
    }

    refreshlist() {
        fetch(Variables.API_URL + 'Guests')
            .then(response => response.json())
            .then(data => {
                this.setState({ Guests: data })
            });
    }
    componentDidMount() {
        this.refreshlist();
    }

    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeEmail = (e) => {
        this.setState({ Email: e.target.value });
    }
    changeMobileNo = (e) => {
        this.setState({ MobileNo: e.target.value });
    }
    changeAadharCardNo = (e) => {
        this.setState({ AadharCardNo: e.target.value });
    }
    addclick() {
        this.setState({
            modaltitle: 'Add Guest',
            GuestId: 0,
            Name: '',
            Email: '',
            MobileNo: '',
            AadharCardNo: ''

        })
    }
    editclick(guest) {
        this.setState({
            modaltitle: 'Edit Guest',
            GuestId: guest.GuestId,
            Name: guest.Name,
            Email: guest.Email,
            MobileNo: guest.MobileNo,
            AadharCardNo: guest.AadharCardNo

        })
    }
    createClick() {
        fetch(Variables.API_URL + 'Guests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.Name,
                Email: this.state.Email,
                MobileNo: this.state.MobileNo,
                AadharCardNo: this.state.AadharCardNo
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    //updateClick() {
    //    fetch(Variables.API_URL + `Guests/${this.state.GuestId}`, {
    //        method: 'PUT',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            GuestId: this.state.GuestId,
    //            Name: this.state.Name,
    //            Email: this.state.Email,
    //            MobileNo: this.state.MobileNo,
    //            AadharCardNo: this.state.AadharCardNo
    //        })
    //    })
    //        .then(res => res.json())
    //        .then(res => console.log(res))
    //        .then((result) => {
    //            alert(result);
    //            this.refreshList();
    //        }, (error) => {
    //            alert(error);
    //        })
    //}

    render() {
        const { Guests, modaltitle, GuestId, Name, Email, MobileNo, AadharCardNo } = this.state
        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="exampleModal"
                    onClick={() => this.addclick()}>Add Guest</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>GuestId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>MobileNo</th>
                            <th>AadharCardNo</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Guests.map(guest =>
                            <tr key={guest.GuestId}>
                                <td>{guest.GuestId}</td>
                                <td>{guest.Name}</td>
                                <td>{guest.Email}</td>
                                <td>{guest.MobileNo}</td>
                                <td>{guest.AadharCardNo}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="exampleModal"
                                        onClick={() => this.editclick(guest)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal-fade" id="exampleModal" tabIndex="-1" area-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modaltitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control"
                                        value={Name}
                                        onChange={this.changeName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email</span>
                                    <input type="text" className="form-control"
                                        value={Email}
                                        onChange={this.changeEmail} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">MobileNo</span>
                                    <input type="text" className="form-control"
                                        value={MobileNo}
                                        onChange={this.changeMobileNo} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">AadharCardNo</span>
                                    <input type="text" className="form-control"
                                        value={AadharCardNo}
                                        onChange={this.changeAadharCardNo} />
                                </div>

                                {GuestId === 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Create</button>
                                    : null
                                }
                                {GuestId !== 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>Update</button>
                                    : null
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Guest