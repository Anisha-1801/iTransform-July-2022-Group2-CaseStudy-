import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Login.css";
import axios from "axios"
import Variables from "../../Variables/Variables";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
   localStorage.removeItem('token');
    const payload = {
      email: state.email,
      password: state.password, 
    };
    axios.post(Variables.api + "UserLogin", payload)
    .then((res) => {localStorage.setItem('token', res.data)
    localStorage.setItem('email',payload.email)
          window.location.reload()})
    .catch((err)=> {console.log(err)
    alert('invalid credentials')
    setState({ email: '', password: '' })
       })  
  };
 
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              type="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="dark" className="submit" type="submit" onClick={handleSubmitClick}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;