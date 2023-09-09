import React, { useState } from 'react';
import { isEmail } from 'validator';
import './Signin.css';
import Signup from '../Signup/Signup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  // Hooks
  const [showSignup, setShowSignup] = useState(false);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = 'Please provide an email address.';
    } else if (!isEmail(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Please provide a password.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    const data = {
      email: email,
      password: password, 
    };
    const token = Cookies.get('token');
    axios
      .post('http://localhost:9000/auth/signin/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Sign-in response:', response.data);
        // Store the token in a cookie
        Cookies.set('token', response.data.token, { expires: 1 });

        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error signing in:', error);

        setErrors({ email: 'Error signing in. Please try again.' });
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
    setEmail('');
    setPassword('');
    setValidated(false);
    setErrors({});
  };

  return (
    <>
      <div className='bg'>

      <div className="sign-container">
        <h3 className="signin-title">LOGIN</h3>
        <form noValidate onSubmit={handleSubmit} onReset={handleReset} className="signin-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`form-control ${validated && !!errors.email ? 'is-invalid' : ''}`}
            />
            {validated && !!errors.email && (
              <div className="form-control-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`form-control ${validated && !!errors.password ? 'is-invalid' : ''}`}
            />
            {validated && !!errors.password && (
              <div className="form-control-feedback">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="signin-submit-btn">
            Submit
          </button>
          <button type="reset" className="signin-reset-btn">
            Reset
          </button>
          <div className="signin-signup-link">
            Don't have an account? 
            <button type="button" className="signin-signup-btn">
              <a href="/signup"> Sign Up</a>
            </button>
          </div>
        </form>
      </div>

      </div>

    </>
  );
};

export default Signin;
