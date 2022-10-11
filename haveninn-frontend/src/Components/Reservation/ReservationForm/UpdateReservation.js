import React,{useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import Variables from '../../../Variables/Variables'
import '../ReservationForm/Form.css'


function UpdateReservation() {
    const location = useLocation();
    const Rid = location.state.Id ;
    // const [nights, setnights] = useState('');
    const [gName, setgName] = useState('');
    const [Rooms, setRooms] = useState([]);
    const [Service, setServices] = useState([]);
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [roomId, setroomId] = useState('');
    const [serviceId, setserviceId] = useState('');
    const [guestId, setguestId] = useState('');
    const [userId, setuserId] = useState('');
    const [adults, setadults] = useState('');
    const [child, setchild] = useState('');
    const time = new Date();
    // const updateTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() ;
    // const nights = checkOut - checkIn;
    const [sName, setsName] = useState('');


    function fetchRooms(){
      axios.get(Variables.api + 'Rooms', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
      .then(response => response.data)
      .then(res => { setRooms(res)})
      .catch( error => console.log(error))

      console.log(Rooms)
  }

    function fetchServices(){
    axios.get(Variables.api + 'Services', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
    .then(response => response.data)
    .then(res => { setServices(res)})
    .catch( error => console.log(error))
  }

  function setCorrectFormat(date){
    var now = new Date(date);
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    return today
  }

  useEffect(() => {
      axios.get(Variables.api + `Reservations/${Rid}`,{ headers: {"Authorization" : `Bearer ${Variables.token}`}})
      .then(response => response.data)
      .then(res => { 
        setguestId(res.GuestId);
        setuserId(res.UserId);
        setroomId(res.RoomId);
        setserviceId(res.ServiceId);
        setcheckIn(setCorrectFormat(res.CheckIn));
        setcheckOut(setCorrectFormat(res.CheckOut));
        // setnights(res.NoOfNights);
        setadults(res.NumberOfAdults)
        setchild(res.NumberOfChildren);
        setgName(res.Guest.Name);
        setsName(res.Service.ServiceName);
      })
      .catch( error => alert(error))

      fetchRooms();
      fetchServices();
  }, [])

  const UpdateReservation = () => {

    axios.put(Variables.api + `Reservations/${Rid}`,{
        ReservationId: Rid,
        GuestId: guestId,
        UserId : userId,
        RoomId : roomId,
        ServiceId : serviceId,
        CheckIn: checkIn,
        CheckOut: checkOut,
        // BookingTime: updateTime,
        // NoOfNights: nights,
        NumberOfAdults: adults,
        NumberOfChildren: child
    },
    { headers: {"Authorization" : `Bearer ${Variables.token}`}})
    .then(res => console.log(res))
    .catch( error => alert(error))
  }


  return (
    <div>
      <div className="r-container">
        <div className="r-container container">
          <div className="row">
            <div className="rf-card card col-md-6 offset-md-3 offset-md-3">
                <h3 className="form-card-title">Update Reservation</h3>
              <div className="card-body">
                <form action="/Reservation" onSubmit={()=>{UpdateReservation()}}> 
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Reservation Id : </label>
                        <input type="text" className="form-control" disabled={true} defaultValue={Rid}/>
                      </div>
                      </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Guest : </label>
                        <input type="text" className="form-control" required={true} defaultValue={gName} disabled={true}/>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-In: </label>
                    <input type="date" name="CheckIn" className="form-control" required={true} defaultValue={checkIn} disabled={true}/>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Check-Out: </label>
                    <input name="CheckOut" className="form-control" required={true} type="date" defaultValue={checkOut} 
                    onChange={e => setcheckOut(e.target.value)}/>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Room Number: </label>
                    <select className="form-select" required={true} onChange={e => setroomId(e.target.value)}>
                        <option defaultValue={roomId}>{roomId} </option>
                        {(Rooms.filter(r=>r.IsAvailable == true)).map(rp=>
                        <option  key={rp.RoomId} value={rp.RoomId}>{rp.RoomId} {rp.RoomType.RoomTypeName}</option>
                         )} 
                    </select>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                  <label> Services: </label>
                    <select className="form-select" required={true} onChange={e => setserviceId(e.target.value)}>
                        <option value={serviceId}> {sName}</option>
                            {Service.map(s=>
                        <option key={s.ServiceId} value={s.ServiceId}>{s.ServiceName}</option>
                         )}
                    </select>
                  </div>
                  </div>
                  </div>    
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                     <label>Adult : </label><br/>
                     <input name="quantity" type="number" className="form-control" required={true} maxLength="2" min="1" 
                     defaultValue={adults} onChange={e => setadults(e.target.value)}/>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                    <label>Child : </label><br/>
                    <input name="quantity" type="number" className="form-control" required={true} maxLength="2" min="0" 
                    defaultValue={child} onChange={e => setchild(e.target.value)}/>
                    </div>
                    </div>
                </div>
                <center className="mt-5">
                  <button type="submit" className="btn btn-warning btn-lg"> 
                  <i class="fa fa-check" aria-hidden="true"></i> &nbsp; Update</button>
                </center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateReservation