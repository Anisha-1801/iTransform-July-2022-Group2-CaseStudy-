// import { useState,useEffect } from 'react'
// import {useLocation} from 'react-router-dom';
// import axios from 'axios'
// import Variables from '../../../Variables/Variables';

// function UpdateReservation() {
//     const location = useLocation();
//     const reservationId = location.state.Id;
//     const [Reservations, setReservations] = useState([]);
//     const [Rooms, setRooms] = useState([]);
//     const [Services, setServices] = useState([]);
//     const [Guests, setGuests] = useState([]);
//     const [Users,setUsers] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get(Variables.api + "Reservations", {
//             headers: { Authorization: `Bearer ${Variables.token}` }
//           })
//           .then((response) => response.data)
//           .then(res => setReservations(res))
//           .catch((error) => {console.log(error); setError(error);});

//           axios.get(Variables.api + 'Users', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
//           .then(response => response.data)
//           .then(res => setUsers(res))
//           .catch( error => console.log(error))

//           axios.get(Variables.api + 'Services', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
//           .then(response => response.data)
//           .then(res => setServices(res))
//           .catch( error => console.log(error))

//           axios.get(Variables.api + 'Guests', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
//           .then(response => response.data)
//           .then(res =>  setGuests(res))
//           .catch( error => console.log(error))

//           axios.get(Variables.api + 'Rooms', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
//           .then(response => response.data)
//           .then(res => setRooms(res))
//           .catch( error => console.log(error))
//       }, []);

//     //Counter 
//     const increment = () => {
//         setNumberOfAdults({
//             NumberOfAdults: prevState.NumberOfAdults + 1
//         });
//     }

//     const decrement = () => {
//         if (this.state.NumberOfAdults === 0) {
//         } else {
//             this.setState((prevState) => ({
//                 NumberOfAdults: prevState.NumberOfAdults - 1
//             }));
//         }
//     }
//     const inputHandle= e =>{
//         this.setState({NumberOfAdults:e.target.value})
//     }

//     const inputChildHandle= e =>{
//         this.setState({NumberOfChildren:e.target.value})
//     }

//     const incrementChild = () =>{
//         this.setState((prevState) => ({
//             NumberOfChildren: prevState.NumberOfChildren + 1
//         }));
//     }

//     const decrementChild = () => {
//         if (this.state.NumberOfChildren === 0) {
//         } else {
//             this.setState((prevState) => ({
//                 NumberOfChildren: prevState.NumberOfChildren - 1
//             }));
//         }
//     }

//     //Date functionality
//     const disableDates = () => {
//       var today, dd, mm, yyyy;
//       today = new Date();
//       console.log(today)
//       dd = today.getDate();
//       if (dd < 10) {
//           dd = '0' + dd
//       }
//       mm = today.getMonth() + 1;
//       if (mm < 10) {
//           mm = '0' + mm
//       }
//       yyyy = today.getUTCFullYear();
//       return yyyy + "-" + mm + "-" + dd;
//   }

//     const UpdateReservationById = reservationId => {
//         axios.post(Variables.api + "Reservations", {
//             header: { Authorization: `Bearer ${Variables.token}` }
//         })
//         .then((response) => response.data)
//         .catch((error) => {console.log(error); setError(error);});
//     }

//     return (
//         <div>
//              {Reservations.map(r => (
//             <div key={r.reservationId}>
//                       <div className="r-container">
//         <div className="r-container container">
//           <div className="row">
//             <div className="rf-card card col-md-6 offset-md-3 offset-md-3">
//                 <h3 className="form-card-title">Update Reservation</h3>
//               <div className="card-body">
//                 <form method="post" action="/Bill">
//                     <div className="row">
//                     <div className="form-group">
//                     <label>Guest : </label>
//                     <input type="text" className="form-control" name="guestName" placeholder='Enter Guest Name' onChange={this.GuestIdHandler}/>
//                   </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12">
//                   <div className="form-group">
//                     <label> Check-In: </label>
//                     <input type="date" name="CheckIn" className="form-control"
//                       value={r.CheckIn} onChange={this.CheckInHandler} min={this.disableDates()}/>
//                   </div>
//                   </div>
//                   <div className="col-lg-6 col-md-6 col-sm-12">
//                   <div className="form-group">
//                     <label> Check-Out: </label>
//                     <input name="CheckOut" className="form-control" type="date"
//                       value={r.CheckOut} onChange={this.CheckOutHandler} min={this.disableDates()}/>
//                   </div>
//                   </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-lg-6 col-md-6 col-sm-12">
//                   <div className="form-group">
//                     <label> Room Number: </label>
//                     <select className="form-select" value={r.RoomId} onChange={this.RoomIdHandler}>
//                         <option value="null">Select Room </option>
//                             {(Rooms.filter(r=>r.IsAvailable === true)).map(rp=>
//                         <option  key={rp.RoomId} value={rp.RoomId}>{rp.RoomId} {rp.RoomType.RoomTypeName}</option>
//                          )}
//                     </select>
//                   </div>
//                   </div>
//                   <div className="col-lg-6 col-md-6 col-sm-12">
//                   <div className="form-group">
//                   <label> Services: </label>
//                     <select className="form-select" value={r.ServiceId} onChange={this.ServiceIdHandler}>
//                         <option value="null">Select Service </option>
//                             {Services.map(s=>
//                         <option  key={s.ServiceId} value={s.ServiceId}>{s.ServiceName}</option>
//                          )}
//                     </select>
//                   </div>
//                   </div>
//                   </div>    
//                   <div className="row">
//                     <div className="col-lg-6 col-md-6 col-sm-12">
//                     <div className="form-group">
//                     <label>Adult : </label><br/>
//                     <div className="m-2" style={{display:"inline-block"}}>
//                     <a href="#" onClick={this.decrement}><i className="fi fa fa-1x fa-minus" aria-hidden="true"></i></a></div>
//                     <div className="" style={{display:"inline-block"}}>
//                     <input name="quantity" type="text" className="count-text form-control" value={r.NumberOfAdults} onChange={this.inputHandle} maxLength="2"/>
//                     </div>
//                     <div className="m-2" style={{display:"inline-block"}}>
//                     <a href="#" onClick={this.increment}><i className="fi fa fa-plus" aria-hidden="true"></i></a>
//                     </div>
//                     </div>
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12">
//                     <div className="form-group">
//                     <label>Child : </label><br/>
//                     <div className="m-2" style={{display:"inline-block"}}>
//                     <a href="#" className="" onClick={this.decrementChild}><i className="fi fa fa-1x fa-minus" aria-hidden="true"></i></a>
//                     </div>
//                     <div className="" style={{display:"inline-block"}}>
//                     <input name="quantity" type="text" className="count-text form-control" value={r.NumberOfChildren} onChange={this.inputChildHandle} maxLength="2"/>
//                     </div>
//                     <div className="m-2" style={{display:"inline-block"}}>
//                     <a href="#" onClick={this.incrementChild}><i className="fi fa fa-plus" aria-hidden="true"></i></a>
//                     </div>
//                     </div>
//                     </div>
//                 </div>
//                 <center className="mt-5">
//                   <button className="btn btn-warning btn-lg" onClick={this.makeReservation}> 
//                   <i class="fa fa-check" aria-hidden="true"></i> Confirm</button>
//                 </center>
//                 </form>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//             </div> ))}
//         </div>
//       )

// }

// export default UpdateReservation
