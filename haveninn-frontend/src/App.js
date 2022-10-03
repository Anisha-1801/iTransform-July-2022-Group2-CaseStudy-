import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AboutUs from './Components/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact';
import LandingPage from './Components/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">
         <BrowserRouter> 
         <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path="/home" element={<LandingPage/>}/>
            <Route path='/about' element={<AboutUs/>} />
            <Route path='/contact' element={<Contact/>} />
            {/* <Route path='/signup' element={<Signup/>} /> 
            <Route path='/login' element={<Login/>} /> 
            <Route path='/addpet' element={<AddPet/>} />  */}
          </Routes>
          {/* <Footer/> */}
        </BrowserRouter>
    </div>
  );
}

export default App;
