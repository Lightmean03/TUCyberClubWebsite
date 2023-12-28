import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";

const Signup = ({ showSignup, setShowSignup }) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    firstname: " ",
    lastname: " ",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 8;

  // Error messages
  const errorMessages = {
    username: {
      required: "Please provide a username.",
    },
    firstname: {
      required: "Please provide a first name.",
    },
    email: {
      required: "Please provide an email address.",
      invalid: "Please provide a valid email address.",
    },
    password: {
      required: "Please provide a password.",
      minLength: "Password must be at least 8 characters long.",
    },
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "required";
    } else if (!isEmail(form.email)) {
      newErrors.email = "invalid";
    }

    if (!form.password) {
      newErrors.password = "required";
    } else if (form.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = "minLength";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sign-up function
  const handleSignUp = () => {
    axios
      .post("http://localhost:9000/auth/Signup", form)
      .then((response) => {
        console.log("Signup response:", response.data);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignUp();
    }
    setValidated(true);
  };

  // Form reset function
  const handleReset = () => {
    setForm({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    setValidated(false);
    setErrors({});
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  return (
    <div className="bg2">
      <div className="modal">
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title signup-title">SIGN UP</h5>
            </div>
            <div className="modal-body">
              <div className="signup-container">
                <div className="row">
                  <div className="col">
                    <div className="form-group mb-3">
                      <label htmlFor="username" className="username">
                        Username:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`form-control ${
                          validated && errors.email ? "is-invalid" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="email">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`form-control ${
                          validated && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {validated && errors.email && (
                        <div className="invalid-feedback">
                          {errorMessages.email[errors.email]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-5">
                      <label htmlFor="password" className="password">
                        Password:
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                        required
                        className={`form-control ${
                          validated && errors.password ? "is-invalid" : ""
                        }`}
                      />
                      {validated && errors.password && (
                        <div className="invalid-feedback">
                          {errorMessages.password[errors.password]}
                        </div>
                      )}
                      <small className="form-text text-muted">
                        Password must be at least 8 characters long.
                      </small>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary signup-submit-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary signup-reset-btn"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button>
                  <a
                    href="/signin"
                    className="signup-close-btn flex justify-start items-start text-left text-1.8rem mt-2rem text-white"
                  >
                    x
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
