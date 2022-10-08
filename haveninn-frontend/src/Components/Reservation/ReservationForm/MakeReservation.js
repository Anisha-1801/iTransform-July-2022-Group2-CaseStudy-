import React, { Component } from 'react'
import axios from 'axios'
import Variables from '../../../Variables/Variables'



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
            ServiceId: "",
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
          .then(res=>alert(res))
         .catch(err=> console.log(err))     

         axios.post(Variables.api+`EmailSender/Reservation?id=${Reservation.GuestId}`)
         .then(alert("success"))
         .catch(alert("failed"))           
    }

  render() {
    const { Rooms,RoomId,Services, ServiceId, CheckIn, CheckOut, NumberOfAdults, NumberOfChildren,UserId } = this.state;
    
   
    return (
        
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                
                <h3>Make Reservation</h3>
              }
           
              <div className="card-body">
                <form >
                    <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-In: </label>
                    <input type="date" name="CheckIn" className="form-control"
                      value={CheckIn} onChange={this.CheckInHandler} />
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-Out: </label>
                    <input name="CheckOut" className="form-control" type="date"
                      value={CheckOut} onChange={this.CheckOutHandler} />
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
                  <div className="form-group">
                    <label>Guest : </label>
                    <input type="text" className="form-control" name="guestName" placeholder='Enter Guest Name' onChange={this.GuestIdHandler}/>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                    <label>Adult : </label>
                    <a href="#" className="btn btn-secondary" onClick={this.decrement}>-</a>
                    <input name="quantity" type="text" className="form-control count-text" value={NumberOfAdults} onChange={this.inputHandle} maxLength="2"/>
                    <a href="#" className="btn btn-secondary" onClick={this.increment}>+</a>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                    <label>Child : </label>
                    <a href="#" className="btn btn-secondary" onClick={this.decrementChild}>-</a>
                    <input name="quantity" type="text" className="form-control count-text" value={NumberOfChildren} onChange={this.inputChildHandle} maxLength="2"/>
                    <a href="#" className="btn btn-secondary" onClick={this.incrementChild}>+</a>
                    </div>
                    </div>
                </div>
                  <button className="btn btn-success" onClick={this.makeReservation}>Create</button>
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