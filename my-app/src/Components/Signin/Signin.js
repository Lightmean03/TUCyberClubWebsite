import React, { useState } from 'react';
import { isEmail } from 'validator';
import './Signin.css';
import Signup from '../Signup/Signup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from '../Signin/UserContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  // Hooks
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const { logout } = useUser();

  const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post('http://localhost:9000/auth/refresh', { refreshToken });
        const newAccessToken = response.data.accessToken;

        // Update the stored access token with the new one
        Cookies.set('token', newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

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

  const handleSignin = () => {
    if (validateForm()) {
        const data = {
            email: email,
            password: password,
        };
        
        attemptSignin(data);
    }
};

const attemptSignin = async (data) => {
    const token = Cookies.get('token');

    try {
        const response = await axios.post('http://localhost:9000/auth/signin', data, {
        withCredentials: true,    
        headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response.data);
        Cookies.set('token', response.data.token);
        Cookies.set('user', JSON.stringify(response.data.user));
        console.log("User: ", response.data.user);
        setUserLoggedIn(response.data.user);
        navigate('/home');
    } catch (err) {
        console.log(err);

        if (err.response && err.response.status === 401) {
            const refreshToken = Cookies.get('refreshToken');
            
            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    
                    if (newAccessToken) {
                        attemptSignin(data);
                    }
                } catch (refreshError) {
                    console.error('Error refreshing access token:', refreshError);
                    //navigate('/signin');
                }
            }
        }
    }
};

const handleLogout = async () => {
  try {
    await axios.post('http://localhost:9000/auth/signout'); 
    logout();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <>
      <div className='bg'>

      <div className="sign-container">
        <h3 className="signin-title">LOGIN</h3>
        <form noValidate onSubmit={handleSignin} onReset={handleLogout} className="signin-form">
          <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border rounded-md text-black'
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 border rounded-md text-black'
                    />
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
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
