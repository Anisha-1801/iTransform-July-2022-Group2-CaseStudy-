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

  const [result, setResult] = useState(null);

  const handleSubmitClick = (e) => {
    e.preventDefault();
   sessionStorage.removeItem('token');
    const payload = {
      email: state.email,
      password: state.password, 
    };
    axios.post(Variables.api + "UserLogin", payload)
    .then((res) => {sessionStorage.setItem('token', res.data)
    sessionStorage.setItem('email',payload.email)
          window.location.reload()})
    .catch((err)=> {
      setResult({
        success:false,
        message:"Invalid Credentials - " + err.message
      })
      setState({ email: '', password: ''})
       })
  };

  const stoperrormessage = () => {
    setResult({
      success: null,
      message : null
    })
  }
 
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={stoperrormessage}>
        <Modal.Title id="contained-modal-title-vcenter">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {result && (
          <p className={`${result.success ? "success" : "error"}`}>
            {result.message}
          </p>
        )}
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
              required
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