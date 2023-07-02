import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { isEmail } from 'validator';

const Signup = ({ showSignup, setShowSignup }) => {
  const [validated, setValidated] = useState(false);
  const [newSign, setNewSign] = useState({
    submitter_email: '',
    submitter_password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [newSign.submitter_email, newSign.submitter_password]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSign({ ...newSign, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSignUp = () => {
    axios
      .post('http://localhost:3000/Signin', newSign)
      .then((response) => {
        console.log('Signup response:', response.data);
        // Handle the response from the backend
        // For example, you can redirect to another page or show a success message
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Handle the error, such as displaying an error message to the user
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignUp();
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
    <div className={`modal ${showSignup ? 'show' : ''}`}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title signup-title">Sign Up</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="signup-container">
              <p className="signup-subtitle">Create Account</p>
              <form
                noValidate
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="signup-form"
              >
                <div className="row">
                  <div className="col">
                    <div className="form-group mb-3">
                      <label htmlFor="submitter_email">Email Address:</label>
                      <input
                        type="email"
                        name="submitter_email"
                        value={newSign.submitter_email}
                        onChange={handleChange}
                        required
                        className={`form-control ${
                          validated && errors.submitter_email
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {validated && errors.submitter_email && (
                        <div className="invalid-feedback">
                          {errors.submitter_email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-5">
                      <label htmlFor="submitter_password">Password:</label>
                      <input
                        type="password"
                        name="submitter_password"
                        onChange={handleChange}
                        value={newSign.submitter_password}
                        required
                        className={`form-control ${
                          validated && errors.submitter_password
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {validated && errors.submitter_password && (
                        <div className="invalid-feedback">
                          {errors.submitter_password}
                        </div>
                      )}
                      <small className="form-text text-muted">
                        Password must be at least 8 characters long.
                      </small>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary signup-submit-btn"
                onClick={handleSignUp}
                >
                  Submit
                </button>
                <button type="reset" className="btn btn-secondary signup-reset-btn">
                  Reset
                </button>
              </form>
              <button
                type="button"
                className="btn btn-outline-secondary signup-cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
