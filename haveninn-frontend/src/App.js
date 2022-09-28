import './App.css';
import  Home  from './Components/Home'
import Guest from './Components/Guest'

import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'



function App() {
    return (
        <BrowserRouter>
            <div className="App container">
                <h3 className="d-flex justify-content-center m-3">
                    HavenInn Management System
                </h3>

                <nav className="navbar navbar-expand-sm bg-light navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item- m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/Home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item- m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/Guest">
                                Guest
                            </NavLink>
                        </li>
                        

                    </ul>
                </nav>

                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Guest" element={<Guest />} />
                   

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;