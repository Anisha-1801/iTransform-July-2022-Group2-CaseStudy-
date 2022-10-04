import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import Navigation from './Components/Navigation/Navigation';
import SearchRooms from './Components/Receptionist/SearchRooms';
import Dashboard from './Components/Dashboard/Dashboard';

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
            {/* <Route path='/signup' element={<Signup/>} /> 
            <Route path='/login' element={<Login/>} /> 
            <Route path='/addpet' element={<AddPet/>} />  */}
          </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;
