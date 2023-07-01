import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS file
import { isEmail } from 'validator';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.post('/api/signup/', newSign);
        console.log('Account Created', response.data);
        handleReset();
      } catch (error) {
        console.error('Error creating account:', error);
      }
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
    <div className={`modal ${showSignup ? 'show' : ''}`} onClick={handleClose}>
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
                      <label htmlFor="Email">Email Address:</label>
                      <input
                        type="email"
                        name="submitter_email"
                        value={newSign.submitter_email}
                        onChange={handleChange}
                        required
                        className={`form-control ${
                          validated && errors.submitter_email ? 'is-invalid' : ''
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.submitter_email}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-5">
                      <label htmlFor="password">Password:</label>
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
                      <div className="invalid-feedback">
                        {errors.submitter_password}
                      </div>
                      <small className="form-text text-muted">
                        Password must be at least 8 characters long.
                      </small>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary signup-submit-btn">
                  Submit
                </button>
                <button type="reset" className="btn btn-secondary signup-reset-btn">
                  Reset
                </button>
              </form>
              <button type="button" className="btn btn-outline-secondary signup-cancel-btn" onClick={handleClose}>
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
