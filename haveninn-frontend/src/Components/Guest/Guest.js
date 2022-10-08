import React, { Component } from 'react'
import Variables from '../../Variables/Variables'
import axios from 'axios'

class Guest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Guests: []
        }
    }

    componentDidMount() {

        axios.get(Variables.api + 'Guests', { headers: { "Authorization": `Bearer ${Variables.token}` } })
            .then(response => response.data)
            .then(res => {
                this.setState({
                    Guests: res
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        const { Guests } = this.state;
        return (
            <div className="container mt-5 mb-5 guest-container">
                <div className="row">
                        {Guests.map(guest => (
                            <div className="col-md-6">
                            <article className="card mb-3 room-card p-3">
                                <div className="row no-gutters">
                                <div className="col-md-8">
                                    <div className="m-2">                            
                                        <h5><b>Guest Id: </b>{guest.GuestId}</h5>
                                        <p><b>Guest Name</b> {guest.Name}</p>
                                        <p><b>Email</b> {guest.Email}</p>
                                        <p><b>Mobile Number</b> {guest.MobileNo}</p>  
                                        <p><b>Aadhar Card Number</b> {guest.AadharCardNo}</p>          
                                    </div>
                                </div>
                            
                                <aside className="col-md-4">
                                <div>
                                    <div class="d-grid gap-3 d-md-flex justify-content-md-right mt-5">        
                                        <a href="/editguest">
                                        <i className="far fa-edit fa-2x text-dark"></i>
                                        </a>                    
                                        <a href="/">
                                        <i className='fa fa-trash fa-2x text-dark'></i>
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
        )
    }
}
export default Guest