import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import "./contact.css";
import axios from 'axios'
import Variables from "../../Variables/Variables";

const Contact = () => {
  const [state, setState] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState(null);

  const sendEmail = (event) => {
    event.preventDefault();
    axios
    .post(Variables.api + 'EmailSender/SendEmail/', { ...state })
    .then(response => {
    setResult(response.data);
    setState({ email: '', name: '', subject: '', message: '' });
    })
    .catch((err) => {
    setResult({ success: false, 
                message: 'Something went wrong. Try again later'+ err});
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      <Navigation />
      <div className="form-body">
        {result && (
          <p className={`${result.success ? "success" : "error"}`}>
            {result.message}
          </p>
        )}
        <form onSubmit={sendEmail} className="SignupForm">
          <h3 id="label-heading">Contact Us</h3>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={state.name}
              placeholder="Enter your full name"
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={state.email}
              placeholder="Enter your email"
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={state.subject}
              placeholder="Enter subject"
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="subject">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={state.message}
              rows="3"
              placeholder="Enter your message"
              onChange={onInputChange}
            />
          </Form.Group>
          <Button
            variant="outline-warning btn-lg"
            id="submit-button"
            type="submit"
            onClick={sendEmail}
          >
            <i class="fa fa-inbox" aria-hidden="true"></i> &nbsp; Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
