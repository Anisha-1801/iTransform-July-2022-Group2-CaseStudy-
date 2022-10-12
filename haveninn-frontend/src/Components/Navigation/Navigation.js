import React from "react";
// import {Link} from 'react-router-dom';
import "./Navigation.css";
import "./logo.png";
import Login from "../Login/Login";
import Variables from "../../Variables/Variables";
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  const [modalShow, setModalShow] = React.useState(false);
  
  const email = Variables.email;
  
  function logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  return (

    <div>
      <nav className="my-navbar navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" >
            <img src={require("./logo.png")} className="logo" alt="HavenInn-Logo" width="70" height="70" />
          </a>
          <h2 className="logo-text">HavenInn</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto navbar-center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {Variables.isUserLoggedin ?
                <></> : <>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="/contact">
                      Contact
                    </a>
                  </li> */}
                </>
              }
              {Variables.isUserLoggedin ?
                <>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                </> :
                <>

                </>
              }
            </ul>
            {Variables.isUserLoggedin ?
              <>
                
                <span className="email-span"><NavDropdown title={email} id="basic-nav-dropdown" >
                  <NavDropdown.Item href="/Users/Changepassword">Change Password</NavDropdown.Item>
                  <NavDropdown.Item href="/"  onClick={logout} >Logout</NavDropdown.Item>
                </NavDropdown> </span>
                {/* <button className="btn prop btn-outline-warning" onClick={logout}>
                  <i className="fa fa-user"> </i> &nbsp; Log Out
                </button> */}
              </> :
              <>
                <button className="btn prop btn-outline-warning" onClick={() => setModalShow(true)}>
                  <i className="fa fa-user"> </i> &nbsp; Log In
                </button>
                <Login show={modalShow} onHide={() => setModalShow(false)} />
              </>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}


export default Navigation;