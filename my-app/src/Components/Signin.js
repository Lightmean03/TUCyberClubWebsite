import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { isEmail } from 'validator';
import './Signin.css';
import Signup from './Signup';

const Signin = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [validated, setValidated] = useState(false);
  const [signInData, setSignInData] = useState({
    submitter_email: '',
    submitter_password: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!signInData.submitter_email) {
      newErrors.submitter_email = 'Please provide an email address.';
    } else if (!isEmail(signInData.submitter_email)) {
      newErrors.submitter_email = 'Please provide a valid email address.';
    }

    if (!signInData.submitter_password) {
      newErrors.submitter_password = 'Please provide a password.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSignIn = () => {
    // Your sign-in logic goes here
    console.log('Sign-in data:', signInData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignIn();
    }
    setValidated(true);
  };

  const handleReset = () => {
    setSignInData({
      submitter_email: '',
      submitter_password: '',
    });
    setValidated(false);
    setErrors({});
  };

  const handleSignupLink = () => {
    setShowSignup(true);
  };

  return (
    <Container>
      {!showSignup ? (
        <>
          <h3 className="signin-title">Sign In</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit} onReset={handleReset} id="Sign-in" className="signin-form">
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label className="form-label">Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="submitter_email"
                value={signInData.submitter_email}
                onChange={handleChange}
                required
                isInvalid={validated && !!errors.submitter_email}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid" className="form-control-feedback">
                {errors.submitter_email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="password">
              <Form.Label className="form-label">Password:</Form.Label>
              <Form.Control
                type="password"
                name="submitter_password"
                onChange={handleChange}
                value={signInData.submitter_password}
                required
                isInvalid={validated && !!errors.submitter_password}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid" className="form-control-feedback">
                {errors.submitter_password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="signin-submit-btn">Submit</Button>
            <Button type="reset" className="signin-reset-btn">Reset</Button>
            <div className="signin-signup-link">
              Don't have an account?{' '}
              <Button variant="link" onClick={handleSignupLink} className="signin-signup-btn">
                Sign Up
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <Signup showSignup={showSignup} setShowSignup={setShowSignup} />
      )}
    </Container>
  );
};

export default Signin;
