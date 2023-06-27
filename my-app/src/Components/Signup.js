import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { isEmail } from 'validator';
import './Signup.css'; // Import the CSS file

const Signup = ({ showSignup, setShowSignup }) => {
  const [validated, setValidated] = useState(false);
  const [newSign, setNewSign] = useState({
    submitter_email: '',
    submitter_password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {
      let newErrors = {};

      if (!newSign.submitter_email) {
        newErrors.submitter_email = 'Please provide an email address.';
      } else if (!isEmail(newSign.submitter_email)) {
        newErrors.submitter_email = 'Please provide a valid email address.';
      }

      if (!newSign.submitter_password) {
        newErrors.submitter_password = 'Please provide a password.';
      } else if (newSign.submitter_password.length < 8) {
        newErrors.submitter_password =
          'Password must be at least 8 characters long.';
      }

      setErrors(newErrors);
    };

    validateForm();
  }, [newSign.submitter_email, newSign.submitter_password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSign({ ...newSign, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log('Account Created', newSign);
      handleReset();
    }
    setValidated(true);
  };

  const handleReset = () => {
    setNewSign({
      submitter_email: '',
      submitter_password: '',
    });
    setValidated(false);
    setErrors({});
  };

  const handleClose = () => {
    setShowSignup(false);
    handleReset();
  };

  return (
    <Modal show={showSignup} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="signup-title">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="signup-container">
          <p className="signup-subtitle">Create Account</p>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="signup-form"
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="Email">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email"
                    name="submitter_email"
                    value={newSign.submitter_email}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !!errors.submitter_email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.submitter_email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-5" controlId="password">
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="submitter_password"
                    onChange={handleChange}
                    value={newSign.submitter_password}
                    required
                    isInvalid={validated && !!errors.submitter_password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.submitter_password}
                  </Form.Control.Feedback>
                  <Form.Text muted>
                    Password must be at least 8 characters long.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="signup-submit-btn">
              Submit
            </Button>
            <Button type="reset" className="signup-reset-btn">
              Reset
            </Button>
          </Form>
          <Button variant="outline-secondary" onClick={handleClose} className="signup-cancel-btn">
          Cancel
        </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
