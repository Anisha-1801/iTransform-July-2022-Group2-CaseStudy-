import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import Navigation from './Components/Navigation/Navigation';
import SearchRooms from './Components/Receptionist/SearchRooms';
import Dashboard from './Components/Dashboard/Dashboard';
import GuestAddform from './Components/Guest/GuestAddForm';
import Guest from './Components/Guest/Guest';
import Reservation from './Components/Reservation/Reservation';
import MakeReservation from './Components/Reservation/ReservationForm/MakeReservation';
import Bill from './Components/Bill/Bill';
// import UpdateReservation from './Components/Reservation/ReservationForm/UpdateReservation'
import AddDepartmentForm from './Components/Department/AddDepartmentForm';
import Department from './Components/Department/Department';
import UpdateDepartmentForm from './Components/Department/UpdateDepartmentForm';
import Inventory from './Components/Inventory/Inventory';
import AddInventory from './Components/Inventory/AddInventory';
import GuestUpdateForm from './Components/Guest/GuestUpdateForm';
import AddBill from './Components/Bill/AddBill';

function App() {
  return (
    <div className="App">
    <Navigation/>
    <BrowserRouter> 
    <Routes>
       <Route exact path='/' element={<LandingPage/>}/>
       <Route exact path="/home" element={<LandingPage/>}/>
       <Route path='/about' element={<AboutUs/>} />
       <Route path='/contact' element={<Contact/>} />
       <Route path='/dashboard' element={<Dashboard/>} />
       <Route path='/searchroom' element={<SearchRooms/>} />
       {/* Guest Routes */}
       <Route path='/Guest' element={<Guest/>}/>
       <Route path='/Guest/Add' element={<GuestAddform/>}/>
       <Route path='/Guest/Update' element={<GuestUpdateForm/>} />
       {/* Reservation Routes */}
       <Route path='/Reservation' element={<Reservation/>}/>
       <Route path='/Reservation/Add' element={<MakeReservation/>} />
       {/* <Route path='/Reservation/Update/' element={<UpdateReservation/>} /> */}
       <Route path='/Department' element={<Department/>} />
       <Route path='/Department/Add' element={<AddDepartmentForm/>} />
       <Route path='/Department/Update' element={<UpdateDepartmentForm/>} />
       {/* Inventory Routes */}
       <Route path='/Inventory' element={<Inventory/>} />
       <Route path='/Inventory/Add' element={<AddInventory/>} />
       {/* Bill Routes */}
       <Route path='/Bill' element={<Bill/>} />
       <Route path='/Bill/Add' element={<AddBill/>} />
     </Routes>
   </BrowserRouter>
   <Footer/>
</div>
  );
}

export default App;
