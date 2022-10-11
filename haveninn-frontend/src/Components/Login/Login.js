import React, { useEffect, useState } from "react";
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

  // const initialValues = {email:"",password:""};
  // const [formValues,setFormValues] = useState(initialValues)
  
  const [formErrors,setFormErrors] = useState({})
  const[isSubmit,setIsSubmit] =  useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // setFormValues({...formValues,[id]: value})

  };

  const [result, setResult] = useState(null);

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
    .catch((err)=> {
      setResult({
        success:false,
        message:"Invalid Credentials - " + err.message
      })
      setState({ email: '', password: ''})
       })
      setFormErrors(validate(state));
      setIsSubmit(true)
  };

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit)
    {
      console.log(state);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } 
    else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } 
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  }

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
      {/* {result && (
          <p className={`${result.success ? "success" : "error"}`}>
          </p>
        )} */}
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
            {result && (
            <p className="text-danger text-center">
              {formErrors.email}
            </p>
             )}
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
            {result && (
            <p className="text-danger text-center">
              {formErrors.password}
            </p>
             )}
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