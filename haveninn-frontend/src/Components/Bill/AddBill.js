import axios from 'axios';
import React, { Component } from 'react'
import Variables from '../../Variables/Variables';



class AddBill extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      Reservations:[],
      Bill:[],
      Payementmode:"Cash",
      ReservationId:0,
      TransactionId:"NA",
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
//  Payementmode:this.state.Bill.PaymentMode,
 ReservationId:this.state.Bill.ReservationId,
 //TransactionId:this.state.Bill.TransactionId,
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
        BillId:this.state.Bill.BillId,
        PaymentMode:this.state.Payementmode, 	
        ReservationId: this.state.Bill.ReservationId,
        TotalPrice:this.state.Bill.TotalPrice,	
        paymentTime:time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(), 	
        TransactionId:this.state.TransactionId,
        Status:"Paid"
      }
      console.log(bill)
      axios.put(Variables.api+`Bills/${this.state.BillId}`,bill,{ headers: {"Authorization" : `Bearer ${Variables.token}`} })
      .then(res=>alert("Success!"))
      .catch(err=>alert("Oops! Something went wrong"+err))
  }

  email(){
        axios.post(Variables.api + `EmailSender/Email/Bill?Reservationid=${this.state.ReservationId}`)
            . then(res=> alert('Email Sent Successfully'))
            .catch(err =>alert('Something went wrong, try again later!'+err))
  }
    render(){
    return (
      <>
      {Variables.isUserLoggedin ?
      <div style={{backgroundColor:"black"}}>
       <div className="row container" >
        <div className="col-lg-6 col-md-6 col-sm-12" style={{marginLeft:"33%"}}>
          <center><h4 className='text-center label-heading'>Guests</h4></center>
            <form onSubmit={this.idhandler}>
              <div className="form-group">
                <center>
                <select className="form-select" required={true} value={this.state.ReservationId} onChange={this.idhandler} style={{width:"250px"}}>
                    <option value={null}>Select Reservation Id </option>
                        {(sessionStorage.getItem('reservationid')==null ?
                        this.state.Reservations:
                        this.state.Reservations.filter(r=>r.ReservationId==sessionStorage.getItem('reservationid'))).map(rp=>
                    <option  key={rp.ReservationId} value={rp.ReservationId} > {rp.RoomId} {rp.Guest.Name}</option>
                      )}
                </select>
                <button className="btn btn-outline-warning mt-3 btn-md">Get bill</button></center>
              </div>
            </form>
            </div>
          </div>
          <div className="r-container">
        <div className="r-container col-md-6 mx-auto">
          <div className='r-container rf-card card mt-3 p-3'>
             <h4 className='label-heading'>Bill</h4>
              <div className="card-body">
                <form >
                <div className="form-group">
                    <label className="form-label">Bill Id :</label>
                    <input type="text" className="form-control" required={true} value={this.state.BillId} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">PaymentMode :</label>
                    <select className="form-select" required={true} value={this.state.Payementmode} onChange={this.paymentmodehandler}>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>
                  </div>
                     {this.state.visibility ? <>
                  <div className="form-group card-display">
                    <label className="form-label">Card Name</label>
                    <input  type ="text" className="form-control" required={true}/>
                    <label className="form-label">Card Number</label>
                    <input  type ="text" className="form-control" required={true}/>
                  </div>
                  <div className="form-group card-display">
                    <div className='row'>
                      <div className='col'>
                        <label className="form-label">Expiration</label>
                         <input  type ="text" className="form-control" required={true} placeholder='MM/YYYY'/>
                      </div>
                      <div className="col">           
                          <label className="form-label">CVV</label>
                          <input  type ="text" className="form-control" required={true}/>
                      </div>
                    </div>
                  </div>
                  <center> <button className="btn btn-outline-warning mt-3" onClick={this.transactionhandler}>Pay</button></center>
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
                  {/* <div className="form-group">
                    <label className="form-label">TransactionId</label>
                    <input  className="form-control" value={this.state.TransactionId} disabled={true}/>
                  </div> */}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <input  className="form-control" value={this.state.Status} disabled={true}/>
                  </div>
                 <center> <button className="btn btn-outline-warning mt-4" onClick={this.payment}>Complete Reservation</button></center>
                 <center> <button className="btn btn-outline-warning mt-3" onClick={this.email}>Send copy to guest</button></center>
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

export default AddBill