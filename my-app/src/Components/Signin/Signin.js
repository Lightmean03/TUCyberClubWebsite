import React, { useState } from 'react';
import { isEmail } from 'validator';
import './Signin.css';
import Signup from'../Signup/Signup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  //Hooks 
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
    setSignInData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: undefined }));
  };
  const navigate  = useNavigate();

  const handleSignIn = () => {
    axios
      .post('http://localhost:9000/auth/signin/', signInData)
      .then((response) => {
        console.log('Sign-in response:', response.data);
        // Store the token in a cookie
        Cookies.set('token', response.data.token, { expires: 1 }); // Expires in 1 day (adjust as needed)
  
        // Redirect to the dashboard page
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        // Handle the error, such as displaying an error message to the user
        setErrors({ submitter_email: 'Error signing in. Please try again.' });
        navigate('/signin');
      });
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
    <>
      {!showSignup && (
        <>
          <h3 className="signin-title">Sign In</h3>
          <div className="sign-container">
            <form noValidate onSubmit={handleSubmit} onReset={handleReset} className="signin-form">
              <div className="mb-3">
                <label htmlFor="submitter_email" className="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  id="submitter_email"
                  name="submitter_email"
                  value={signInData.submitter_email}
                  onChange={handleChange}
                  required
                  className={`form-control ${validated && !!errors.submitter_email ? 'is-invalid' : ''}`}
                />
                {validated && !!errors.submitter_email && (
                  <div className="form-control-feedback">{errors.submitter_email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="submitter_password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="submitter_password"
                  name="submitter_password"
                  onChange={handleChange}
                  value={signInData.submitter_password}
                  required
                  className={`form-control ${validated && !!errors.submitter_password ? 'is-invalid' : ''}`}
                />
                {validated && !!errors.submitter_password && (
                  <div className="form-control-feedback">{errors.submitter_password}</div>
                )}
              </div>
              <button type="submit" className="signin-submit-btn">
                Submit
              </button>
              <button type="reset" className="signin-reset-btn">
                Reset
              </button>
              <div className="signin-signup-link">
                Don't have an account?{' '}
                <button type="button" onClick={handleSignupLink} className="signin-signup-btn">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {showSignup && <Signup showSignup={showSignup} setShowSignup={setShowSignup} />}
    </>
  );
};

export default Signin;
