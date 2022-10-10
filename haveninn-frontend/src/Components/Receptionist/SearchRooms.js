import axios from "axios";
import React, { Component } from "react";
import Variables from "../../Variables/Variables";
import "./SearchRooms.css";
class SearchRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Rooms: [],
      isChecked: false,
      roomTypeName:"null",
      roomTypes:[]
    };
  }

  fetchroomtypes(){
    axios.get(Variables.api + 'RoomTypes', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
    .then(response => response.data)
    // .then(res=>console.log(res))
    .then(res => { this.setState({
       roomTypes:res
    })})
    .catch( error => console.log(error))
  }
handleclick=()=>{
    //  e.preventDefault(); 
    this.setState({
     isChecked: this.state.isChecked ? false : true
    })
  }

  handlechange= event=>{
    this.setState({
      roomTypeName:event.target.value
    })
  }


  componentDidMount() {
    axios
      .get(Variables.api + "Rooms", {
        headers: { Authorization: `Bearer ${Variables.token}` },
      })
      .then((response) => response.data)
      .then((res) => {
        this.setState({
          Rooms: res,
        });
      })
      .catch((error) => console.log(error));
      this.fetchroomtypes()
  }

  render() {
    const { Rooms,isChecked,roomTypeName,roomTypes } = this.state;
    const filteredRooms = isChecked ? Rooms.filter(room=>room.IsAvailable === true) :Rooms
    const filteredRoomTypes = roomTypeName === "null" ? filteredRooms :
    (filteredRooms.filter(room=>String(room.RoomType.RoomTypeName)===String(roomTypeName)))

    return (
      <>
      <div className="row p-5 card-container">
      <div className="mb-3 filters d-grid gap-3 d-md-flex justify-content-md-right form-check form-switch">
          <input className="form-check-input mt-2 fs-5" type="checkbox" checked={isChecked} onChange={this.handleclick}/>
          <label className="form-check-label fw-bold mt-1">Available Rooms Only</label>
          <select className="form-select" value={roomTypeName} onChange={this.handlechange}>
            <option value="null">Select Room Types</option>
            {roomTypes.map(rp=>
            <option  key={rp.RoomTypeId} value={rp.RoomTypeName}>{rp.RoomTypeName}</option>
            )}
          </select>
        </div>
        {filteredRoomTypes.map((room) => (
          <div className="col-sm-6" key={room.RoomId}>
            <article className="card mb-3 room-card p-3">
              <div className="row no-gutters">
                <div className="col-md-8">
                  <div className="ms-2">
                    <a href="/room" className="mb-2">
                      <h3 className="para-head" >Room No. : {room.RoomId}</h3>
                    </a>
                    <p className="para-text">
                      <b>Type :</b> {room.RoomType.RoomTypeName}<br />
                      <b>Description :</b> {room.Description} 
                    </p>
                  </div>
                </div>
                <aside className="col-md-4">
                  <div>
                    <span className="h3">&#8377; {room.RoomType.Price}</span>
                    <small className="text-muted"> /per night</small>
                    <p className="mt-2">
                    {room.IsAvailable ? (
                    <span className="badge bg-success">Available</span>) : 
                    (<span className="badge bg-secondary">Booked</span>)}
                    </p> 
                    <p className="mt-3">
                      {room.IsAvailable ? (
                        <a href="/Reservation/Add" className="btn btn-outline-success">
                          <i className="fa fa-bed" aria-hidden="true"></i>&nbsp; Reserve
                        </a>
                      ) : (
                        <button className="btn btn-warning" disabled>
                          <i className="fa fa-check" aria-hidden="true"></i>&nbsp; Reserved
                        </button>
                      )}
                    </p>
                  </div>
                </aside>
              </div>
            </article>
          </div>
        ))}
      </div>
      </>
    );
  }
}

export default SearchRooms;
