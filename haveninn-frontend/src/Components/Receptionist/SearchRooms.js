import axios from 'axios'
import React, { Component } from 'react'
import Variables from '../../Variables/Variables'
import './SearchRooms.css'
class SearchRooms extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        Rooms: []
      }
    }
    componentDidMount(){
        
        axios.get(Variables.api + 'Rooms', { headers: {"Authorization" : `Bearer ${Variables.token}`} }) 
        .then(response => response.data)
        .then(res => { this.setState({
           Rooms : res
        })})
        .catch( error => console.log(error))
    }

    // availableRooms() {
    //     const {Rooms} =  this.state;
    //     axios.get(Variables.api + 'Rooms/available', { headers: {"Authorization" : `Bearer ${Variables.token}`} })
    //     // .then(res => console.log(res.data))
    //     .then(response => response.data)
    //     // .then(res => document.write(res))
    //     .then(res => { this.setState({
    //        Rooms : res
    //     })})
    //     .catch( error => console.log(error))
    // }
  render() {
    const {Rooms} = this.state; 
    return (
      <div className="getroom">
        {/* <form>
            <button className="btn btn-danger" type="submit" onClick = {() => this.availableRooms() }>Check</button>
        </form> */}
        <table className="table table-hover text-center">
            <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Room Type</th>
                    <th>Room Rate</th>
                    <th>Room Status</th>  
                    <th>Description</th>
                    <th></th>
                </tr> 
            </thead>
            <tbody>
                {Rooms.map(room =>
                <tr key={room.RoomId}>
                    <td>{room.RoomId}</td>
                    <td>{room.RoomType.RoomTypeName}</td>  
                    <td>{room.RoomType.Price}</td>
                    <td>{room.IsAvailable ? "Available": "Not Available" }</td> 
                    <td>{room.Description}</td>
                    <td>{room.IsAvailable ? <button className="btn btn-outline-success"><i class="fa fa-bed" aria-hidden="true"></i> Reserve</button>: 
                     <button className="btn btn-warning" disabled><i class="fa fa-check" aria-hidden="true"></i> Booked</button> }</td>
                </tr>
                )}
            </tbody>
        </table>
      </div>
      
    )
  }
}

export default SearchRooms