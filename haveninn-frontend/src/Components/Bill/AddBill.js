import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';



class AddBill extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      Reservations:[],
      Bill:[],
      Payementmode:"null",
      ReservationId:0,
      TransactionId:"null",
      Status:"unpaid",
      BillId:0,
      TotalPrice:0,
      visibility:false
    }
    this.paymentmodehandler=this.paymentmodehandler.bind(this);
    this.transactionhandler=this.transactionhandler.bind(this);
    this.payment=this.payment.bind(this);
    this.email=this.email.bind(this);
  }
  idhandler=e=>{
    e.preventDefault();
   
    axios.get(Variables.api + `Bills/RID?id=${e.target.value}`, {headers: { Authorization: `Bearer ${Variables.token}` } })
    .then((response) => response.data)
    .then(res => {
    this.setState({
     Bill: res
      });
})
.catch((error) => console.log(error)); 

this.setState({
 Payementmode:this.state.Bill.PaymentMode,
 ReservationId:this.state.Bill.ReservationId,
 TransactionId:this.state.Bill.TransactionId,
 Status:this.state.Bill.Status,
 BillId:this.state.Bill.BillId,
 TotalPrice:this.state.Bill.TotalPrice
})
   }
   paymentmodehandler=e=>{
    if(e.target.value=="Cash")
    this.setState({
      Payementmode:e.target.value,
     visibility: false
    })
    else{
      this.setState({
        Payementmode:e.target.value,
        visibility: true
      })
    }
    console.log(this.state.Payementmode)
   }
   transactionhandler=e=>{
    e.preventDefault();
    const min = 1000000;
    const max = 999999999;
    const rand = "T"+ Math.floor(Math.random() *  (max - min));

    this.setState({
     TransactionId: rand
    })
    console.log(this.state.TransactionId)
   }
 
  componentDidMount(){
    axios.get(Variables.api + 'Reservations', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
    .then(response => response.data)
    .then(res => { this.setState({
       Reservations:res
    })})
    .catch( error => console.log(error))
  }
   payment()
   {
    const time= new Date()
      const bill ={
        BillId:this.state.Bill. BillId,
        PaymentMode:this.state.Payementmode, 	
        ReservationId: this.state.Bill.ReservationId,
        TotalPrice:this.state.Bill.TotalPrice,	
        paymentTime:time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(), 	
        TransactionId:this.state.TransactionId,
        Status:"paid"
      }
      console.log(bill)
      axios.put(Variables.api+`Bills/${this.state.BillId}`,bill,{ headers: {"Authorization" : `Bearer ${Variables.token}`} })
      .then(res=>alert(res))
      .catch(err=>alert(err))
  }

  email(){
        axios.post(Variables.api + `EmailSender/Email/Bill?Reservationid=${this.state.ReservationId}`)
            . then(res=> alert('Email Sent Successfully'))
            .catch(err =>alert('Something went wrong, try again later!' ))
  }
    render(){
      const filteredreservations = localStorage.getItem('guestid')==null?this.state.Reservations :this.state.Reservations.filter(r=>r.GuestId==localStorage.getItem('guestid'))
    return (
      <div>
       <div className="row container">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <h4 className='text-center'>Guests</h4>
            <form onSubmit={this.idhandler}>
              <div className="form-group">
                <label className="form-label">Reservation Id :</label>
                <center>
                <select className="form-select" value={this.state.ReservationId} onChange={this.idhandler} style={{width:"250px"}}>
                    <option value={null}>Select Reservation Id </option>
                        {(localStorage.getItem('roomid')==null?filteredreservations:(filteredreservations.filter(r=>r.RoomId==localStorage.getItem('roomid')))).map(rp=>
                    <option  key={rp.ReservationId} value={rp.ReservationId} > {rp.RoomId} {rp.Guest.Name}</option>
                      )}
                </select>
                <button className="btn btn-success mt-3">Get bill</button></center>
              </div>
            </form>
            </div>
          </div>
          <div className="container">
        <div className="col-md-6 m-5 mx-auto">
          <div className='card mt-3 p-3'>
             <h4 className='text-center'>Bill</h4>
              <div className="card-body">
                <form >
                <div className="form-group">
                    <label className="form-label">Bill Id</label>
                    <input type="text" className="form-control" value={this.state.BillId} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">PaymentMode</label>
                    <select className="form-select" value={this.state.Payementmode} onChange={this.paymentmodehandler}>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>
                  </div>
                     {this.state.visibility ? <>
                  <div className="form-group card-display">
                    <label className="form-label">Card Name</label>
                    <input  type ="text" className="form-control"/>
                    <label className="form-label">Card Number</label>
                    <input  type ="text" className="form-control"/>
                  </div>
                  <div className="form-group card-display">
                    <div className='row'>
                      <div className='col'>
                        <label className="form-label">Expiration</label>
                         <input  type ="text" className="form-control" placeholder='MM/YYYY'/>
                      </div>
                      <div className="col">           
                          <label className="form-label">CVV</label>
                          <input  type ="text" className="form-control"/>
                      </div>
                    </div>
                  </div>
                  <center> <button className="btn btn-success mt-3" onClick={this.transactionhandler}>Pay</button></center>
                  </>
                  :
                  <></>}
                  <div className="form-group">
                    <label className="form-label">Reservation Id</label>
                    <input  className="form-control" value={this.state.ReservationId} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Total Price</label>
                    <input  className="form-control" value={this.state.TotalPrice}disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">TransactionId</label>
                    <input  className="form-control" value={this.state.TransactionId} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <input  className="form-control" value={this.state.Status} disabled={true}/>
                  </div>
                 <center> <button className="btn btn-success mt-3" onClick={this.payment}>Complete Reservation</button></center>
                 <center> <button className="btn btn-success mt-3" onClick={this.email}>Send copy to guest</button></center>
                </form>
              </div>
            </div>
            </div>
          </div>

      </div>
    )
  }
}

export default AddBill