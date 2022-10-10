import React, { Component } from 'react'
import axios from 'axios'
import Variables from '../../../Variables/Variables'
import './Form.css'



class MakeReservation extends Component {
    constructor(props){
        super(props)
      
        this.state = {
            Rooms:[],
            Services:[],
            Guests:[],
            Users:[],
            // Name:"",
            ReservationId: "",
            GuestId: "",
            RoomId: "",
            ServiceId: null,
            UserId: "",
            CheckIn: new Date().toISOString().slice(0,10),
            CheckOut: new Date().toISOString().slice(0,10),
            NumberOfAdults: 0,
            NumberOfChildren: 0

        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.incrementChild = this.incrementChild.bind(this);
        this.decrementChild = this.decrementChild.bind(this);
        this.GuestIdHandler = this.GuestIdHandler.bind(this);
        this.RoomIdHandler = this.RoomIdHandler.bind(this);
        this.ServiceIdHandler = this.ServiceIdHandler.bind(this);
        this.CheckInHandler = this.CheckInHandler.bind(this);
        this.CheckOutHandler = this.CheckOutHandler.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
    }

    GuestIdHandler = e =>{
        const guest = this.state.Guests.filter( g => String(g.Name).toLocaleLowerCase() === String(e.target.value).toLocaleLowerCase())
        const guestid=guest.map(g=>g.GuestId)
        this.setState({
            GuestId: guestid[0]
        })
    }
    //  guestname=e=>{
    //     this.setState({Name:e.target.value})
    //  }
    RoomIdHandler = e => {
        this.setState({
            RoomId: e.target.value
        })
    }

    ServiceIdHandler = e => {
        this.setState({
            ServiceId: e.target.value
        })
    }


    CheckInHandler = (e) => {
        this.setState({ CheckIn: e.target.value });
    };

    CheckOutHandler = (e) => {
        this.setState({ CheckOut: e.target.value });
    };

   

    fetchUsers(){
        axios.get(Variables.api + 'Users', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => { this.setState({
           Users:res
        })})
        .catch( error => console.log(error))
    }

    fetchServices(){
        axios.get(Variables.api + 'Services', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => { this.setState({
           Services:res
        })})
        .catch( error => console.log(error))
    }

    fetchGuests(){
        axios.get(Variables.api + 'Guests', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => { this.setState({
           Guests:res
        })})
        .catch( error => console.log(error))
    }

    fetchRooms(){
        axios.get(Variables.api + 'Rooms', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => { this.setState({
           Rooms:res
        })})
        .catch( error => console.log(error))
    }

    //Counter 
    increment() {
        this.setState((prevState) => ({
            NumberOfAdults: prevState.NumberOfAdults + 1
        }));
    }

    decrement() {
        if (this.state.NumberOfAdults === 0) {
        } else {
            this.setState((prevState) => ({
                NumberOfAdults: prevState.NumberOfAdults - 1
            }));
        }
    }
    inputHandle= e =>{
        this.setState({NumberOfAdults:e.target.value})
    }

    inputChildHandle= e =>{
        this.setState({NumberOfChildren:e.target.value})
    }

    incrementChild() {
        this.setState((prevState) => ({
            NumberOfChildren: prevState.NumberOfChildren + 1
        }));
    }

    decrementChild() {
        if (this.state.NumberOfChildren === 0) {
        } else {
            this.setState((prevState) => ({
                NumberOfChildren: prevState.NumberOfChildren - 1
            }));
        }
    }

    //Date functionality
    disableDates = () => {
      var today, dd, mm, yyyy;
      today = new Date();
      console.log(today)
      dd = today.getDate();
      if (dd < 10) {
          dd = '0' + dd
      }
      mm = today.getMonth() + 1;
      if (mm < 10) {
          mm = '0' + mm
      }
      yyyy = today.getUTCFullYear();
      return yyyy + "-" + mm + "-" + dd;
  }

    
    componentDidMount(){
        this.fetchRooms()
        this.fetchServices()
        this.fetchGuests()
        this.fetchUsers()
    }
   
    makeReservation(){
        const User = this.state.Users.filter( user => user.Email == Variables.email)
        const u=User.map(u=>u.UserId)
        console.log(u[0])
       
        console.log(this.state.UserId)
        let Reservation = {
            GuestId: this.state.GuestId,
            UserId: u[0],
            RoomId: this.state.RoomId,
            ServiceId: this.state.ServiceId,
            CheckIn: this.state.CheckIn,
            CheckOut: this.state.CheckOut,
            NumberOfAdults: this.state.NumberOfAdults,
            NumberOfChildren: this.state.NumberOfChildren
        }

       
       console.log(Reservation)
        axios.post(Variables.api + 'Reservations',Reservation,{ headers: {"Authorization" : `Bearer ${Variables.token}`} })
             .then(res=>alert(res))
             .catch(err=> alert(err))

         
          const room=this.state.Rooms.filter(s=>s.RoomId==Reservation.RoomId)
          const rti= room.map(r=>r.RoomTypeId)
          const status=false
          const D=room.map(r=>r.Description)
          let uroom ={RoomId:Reservation.RoomId,RoomTypeId:rti[0],IsAvailable:status,Description:D[0]}
          console.log(uroom)
         axios.put(Variables.api+`Rooms/${Reservation.RoomId}`,uroom,{ headers: {"Authorization" : `Bearer ${Variables.token}`} })
         .then(res=>console.log(res))
         .catch(err=>console.log(err))    

         axios.post(Variables.api+`EmailSender/Reservation?id=${Reservation.GuestId}&roomId=${Reservation.RoomId}`)
         .then(res=>console.log(res))
         .catch(err=>console.log(err))           
    }

  render() {
    const { Rooms,RoomId,Services, ServiceId, CheckIn, CheckOut, NumberOfAdults, NumberOfChildren} = this.state;
    return (  
      <div className="r-container">
        <div className="r-container container">
          <div className="row">
            <div className="rf-card card col-md-6 offset-md-3 offset-md-3">
                <h3 className="form-card-title">Make Reservation</h3>
              <div className="card-body">
                <form action="/Reservation">
                    <div className="row">
                    <div className="form-group">
                    <label>Guest : </label>
                    <input type="text" className="form-control" name="guestName" placeholder='Enter Guest Name' onChange={this.GuestIdHandler}/>
                  </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-In: </label>
                    <input type="date" name="CheckIn" className="form-control"
                      value={CheckIn} onChange={this.CheckInHandler} min={this.disableDates()}/>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-Out: </label>
                    <input name="CheckOut" className="form-control" type="date"
                      value={CheckOut} onChange={this.CheckOutHandler} min={this.disableDates()}/>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Room Number: </label>
                    <select className="form-select" value={RoomId} onChange={this.RoomIdHandler}>
                        <option value="null">Select Room </option>
                            {(Rooms.filter(r=>r.IsAvailable === true)).map(rp=>
                        <option  key={rp.RoomId} value={rp.RoomId}>{rp.RoomId} {rp.RoomType.RoomTypeName}</option>
                         )}
                    </select>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                  <label> Services: </label>
                    <select className="form-select" value={ServiceId} onChange={this.ServiceIdHandler}>
                        <option value="null">Select Service </option>
                            {Services.map(s=>
                        <option  key={s.ServiceId} value={s.ServiceId}>{s.ServiceName}</option>
                         )}
                    </select>
                  </div>
                  </div>
                  </div>    
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                    <label>Adult : </label><br/>
                    <div className="m-2" style={{display:"inline-block"}}>
                    <a href="#" onClick={this.decrement}><i className="fi fa fa-1x fa-minus" aria-hidden="true"></i></a></div>
                    <div className="" style={{display:"inline-block"}}>
                    <input name="quantity" type="text" className="count-text form-control" value={NumberOfAdults} onChange={this.inputHandle} maxLength="2"/>
                    </div>
                    <div className="m-2" style={{display:"inline-block"}}>
                    <a href="#" onClick={this.increment}><i className="fi fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                    <label>Child : </label><br/>
                    <div className="m-2" style={{display:"inline-block"}}>
                    <a href="#" className="" onClick={this.decrementChild}><i className="fi fa fa-1x fa-minus" aria-hidden="true"></i></a>
                    </div>
                    <div className="" style={{display:"inline-block"}}>
                    <input name="quantity" type="text" className="count-text form-control" value={NumberOfChildren} onChange={this.inputChildHandle} maxLength="2"/>
                    </div>
                    <div className="m-2" style={{display:"inline-block"}}>
                    <a href="#" onClick={this.incrementChild}><i className="fi fa fa-plus" aria-hidden="true"></i></a>
                    </div>
                    </div>
                    </div>
                </div>
                <center className="mt-5">
                  <button className="btn btn-warning btn-lg" onClick={this.makeReservation}> 
                  <i class="fa fa-check" aria-hidden="true"></i> Confirm</button>
                </center>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default MakeReservation