import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import Navigation from './Components/Navigation/Navigation';
import SearchRooms from './Components/Rooms/SearchRooms';
import Dashboard from './Components/Dashboard/Dashboard';
import GuestAddform from './Components/Guest/GuestAddForm';
import Guest from './Components/Guest/Guest';
import Reservation from './Components/Reservation/Reservation';
import MakeReservation from './Components/Reservation/ReservationForm/MakeReservation';
import Bill from './Components/Bill/Bill';
import UpdateReservation from './Components/Reservation/ReservationForm/UpdateReservation'
import AddDepartmentForm from './Components/Department/AddDepartmentForm';
import Department from './Components/Department/Department';
import UpdateDepartmentForm from './Components/Department/UpdateDepartmentForm';
import Inventory from './Components/Inventory/Inventory';
import AddInventory from './Components/Inventory/AddInventory';
import GuestUpdateForm from './Components/Guest/GuestUpdateForm';
import AddBill from './Components/Bill/AddBill';
import UpdateInventory from './Components/Inventory/UpdateInventory';
import Staff from './Components/Staff/Staff';
import UpdateStaffForm from './Components/Staff/UpdateStaffForm';
import StaffAddForm from './Components/Staff/AddStaffForm';
import Services from './Components/Services/Services';
import AddServicesForm from './Components/Services/AddServicesForm';
import UpdateServicesForm from './Components/Services/UpdateServicesForm';
import Room from './Components/Rooms/Room';
import RoomTypeUpdateForm from './Components/Rooms/RoomTypeUpdateForm';
import RoomTypeAddForm from './Components/Rooms/RoomTypeAddForm';
import RoomType from './Components/Rooms/RoomType';
import RoomUpdateForm from './Components/Rooms/RoomUpdateForm';
import RoomAddForm from './Components/Rooms/RoomAddForm';
import User from './Components/Users/Users';
import Users from './Components/Users/Users';
import AddUsers from './Components/Users/AddUsers';

function App() {
  return (
    <div className="App">
    <Navigation/>
    <BrowserRouter> 
    <Routes>   
       <Route exact path='/' element={<LandingPage/>}/>
       {/* <Route exact path="/home" element={<LandingPage/>}/> */}
       <Route path='/about' element={<AboutUs/>} />
       <Route path='/contact' element={<Contact/>} />
       {/* Home Routes */}
       <Route path='/dashboard' element={<Dashboard/>} />
       {/* Guest Routes */}
       <Route path='/Guest' element={<Guest/>}/>
       <Route path='/Guest/Add' element={<GuestAddform/>}/>
       <Route path='/Guest/Update' element={<GuestUpdateForm/>} />
       {/* Reservation Routes */}
       <Route path='/Reservation' element={<Reservation/>}/>
       <Route path='/Reservation/Add' element={<MakeReservation/>} />
       <Route path='/Reservation/Update' element={<UpdateReservation/>} />
        {/* Room Routes */}
        <Route path='/searchroom' element={<SearchRooms/>} />
        {/* Bill Routes */}
       <Route path='/Bill' element={<Bill/>} />
       <Route path='/Bill/Add' element={<AddBill/>} />
       {/* Department Routes */}
       <Route path='/Department' element={<Department/>} />
       <Route path='/Department/Add' element={<AddDepartmentForm/>} />
       <Route path='/Department/Update' element={<UpdateDepartmentForm/>} />
       {/* Inventory Routes */}
       <Route path='/Inventory' element={<Inventory/>} />
       <Route path='/Inventory/Add' element={<AddInventory/>} />
       <Route path='/Inventory/Update' element={<UpdateInventory/>} />
       {/* Room Routes */}
       <Route path='/Room' element={<Room/>}/>
       <Route path='/Room/Add' element={<RoomAddForm/>}/>
       <Route path='/Room/Update' element={<RoomUpdateForm/>}/>
       {/* RoomType Routes */}
       <Route path='/RoomType' element={<RoomType/>}/>
       <Route path='/RoomType/Add' element={<RoomTypeAddForm/>}/>
       <Route path='/RoomType/Update' element={<RoomTypeUpdateForm/>}/>
       {/* Staff Routes */}
       <Route path='/Staff' element={<Staff/>} />
       <Route path='/Staff/Add' element={<StaffAddForm/>} />
       <Route path='/Staff/Update' element={<UpdateStaffForm/>} />
       {/* Services Routes */}
       <Route path='/Services' element={<Services/>} />
       <Route path='/Services/Add' element={<AddServicesForm/>} />
       <Route path='/Services/Update' element={<UpdateServicesForm/>} />

       <Route path='/Users' element={<Users/>} />
       <Route path='/Users/Add' element={<AddUsers/>} />

       
       
     </Routes>
   </BrowserRouter>
   <Footer/>
</div>
  );
}

export default App;
