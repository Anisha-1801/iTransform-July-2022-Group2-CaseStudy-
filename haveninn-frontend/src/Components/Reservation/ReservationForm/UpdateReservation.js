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
    const [mindate,setmindate]=useState('');
    const [mindate2,setmindate2]=useState('');
    const time = new Date();
    // const updateTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() ;
    // const nights = checkOut - checkIn;
    const [sName, setsName] = useState('');


    function fetchRooms(){
      axios.get(Variables.api + 'Rooms', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
      .then(response => response.data)
      .then(res => { setRooms(res)})
      .catch( error => console.log("Oops! Something went wrong."))

      console.log(Rooms)
  }

    function fetchServices(){
    axios.get(Variables.api + 'Services', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
    .then(response => response.data)
    .then(res => { setServices(res)})
    .catch( error => console.log("Oops! Something went wrong."))
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
 function disableDates(){
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    mm = today.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm
    }
    yyyy = today.getUTCFullYear();
    setmindate(yyyy + "-" + mm + "-" + dd)
}
function disableDates2  () {
  var today, dd, mm, yyyy;
  today = new Date();
  dd = today.getDate()+1;
  if (dd < 10) {
      dd = '0' + dd
  }
  mm = today.getMonth() + 1;
  if (mm < 10) {
      mm = '0' + mm
  }
  yyyy = today.getUTCFullYear();
  setmindate2(yyyy + "-" + mm + "-" + dd)
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
      .catch( error => {alert("Oops! Something went wrong.");
            console.log(error)})

      fetchRooms();
      fetchServices();
      disableDates();
      disableDates2();
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
        NumberOfAdults: adults,
        NumberOfChildren: child
    },
    { headers: {"Authorization" : `Bearer ${Variables.token}`}})
    .then(res => alert("Updated Successfully!"))
    .catch(alert("Oops! Something went wrong."))
  }


  return (
    <>
    {Variables.isUserLoggedin ? 
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
                        <label className='form-label'>Reservation Id : </label>
                        <input type="text" className="form-control" disabled={true} defaultValue={Rid}/>
                      </div>
                      </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label className='form-label'>Guest : </label>
                        <input type="text" className="form-control" required={true} defaultValue={gName} disabled={true}/>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className='form-label'> Check-In: </label>
                    <input type="date" name="CheckIn" className="form-control" required={true}  defaultValue={checkIn} min={mindate} onChange={e => setcheckIn(e.target.value)}/>
                  </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className='form-label'> Check-Out: </label>
                    <input name="CheckOut" className="form-control" required={true} type="date"  defaultValue={checkOut}  min={mindate2} 
                    onChange={e => setcheckOut(e.target.value)}/>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label className='form-label'> Room Number: </label>
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
                  <label className='form-label'> Services: </label>
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
                     <label className='form-label'>Adult : </label><br/>
                     <input name="quantity" type="number" className="form-control" required={true} maxLength="2" min="1" 
                     defaultValue={adults} onChange={e => setadults(e.target.value)}/>
                    </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                    <label className='form-label'>Child : </label><br/>
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
    :<><center><h1 className="label-heading " style={{color:"black"}}> Please Login to Access This Page </h1></center></> }
    </>
  )
}

export default UpdateReservation