import React, { useState } from "react";
import "./Signup.css";
import { useAuthStore } from "../../utils/authStore";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { handleSignUp } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await handleSignUp(formData);
      navigate("/signin");
    } catch (err) {
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg2">
        <div className="modal">
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title signup-title">SIGN UP</h5>
              </div>
              <div className="modal-body">
                <div className="signup-container">
                  <div className="form-group mb-3">
                    <label htmlFor="username" className="username">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email" className="email">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password" className="password">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                    <small className="form-text text-muted">
                      Password must be at least 8 characters long.
                    </small>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="confirmPassword" className="confirmPassword">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between">
                    <SignupButton loading={loading} />
                  </div>
                  <div className="text-center mt-3">
                    <Link to="/signin">Already have an account? Sign in</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const SignupButton: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <button
      type="submit"
      className="mt-6 w-full bg-blue-500 text-white text-sm font-medium py-3 rounded-md"
      disabled={loading}
    >
      {loading ? "Signing up..." : "Sign up"} <ArrowRightIcon className="h-4 w-4 inline" />
    </button>
  );
};

export default Signup;
